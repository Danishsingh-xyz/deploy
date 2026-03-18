import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { env } from "../config/env.js";

const streamPipeline = promisify(pipeline);

const safeFilename = (input, fallbackExt = "") => {
  const fallback = `download${fallbackExt ? `.${fallbackExt}` : ""}`;
  if (!input) return fallback;
  const cleaned = input.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80);
  if (!cleaned) return fallback;
  if (fallbackExt && !cleaned.endsWith(`.${fallbackExt}`)) return `${cleaned}.${fallbackExt}`;
  return cleaned;
};

const extToContentType = (ext) => {
  switch (ext) {
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "m4a":
      return "audio/mp4";
    case "mp3":
      return "audio/mpeg";
    case "opus":
      return "audio/ogg";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "vtt":
      return "text/vtt";
    case "srt":
      return "application/x-subrip";
    default:
      return "";
  }
};

const inferExt = (extParam, url) => {
  const sanitized = (extParam || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
  if (sanitized) return sanitized;
  const pathname = new URL(url).pathname;
  const m = pathname.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
};

const runYtDlpMerge = async (pageUrl, formatId, res, filename) => {
  const tempDir = await mkdtemp(join(tmpdir(), "snapfetch-"));
  const outputPath = join(tempDir, filename);

  try {
    await new Promise((resolve, reject) => {
      const args = [
        "-f",
        `${formatId}+bestaudio[ext=m4a]/${formatId}+bestaudio/best`,
        "--no-playlist",
        "--merge-output-format",
        "mp4",
        "-o",
        outputPath,
        pageUrl
      ];

      if (env.FFMPEG_BINARY) {
        args.unshift("--ffmpeg-location", env.FFMPEG_BINARY);
      }

      const ytdlp = spawn(env.YTDLP_BINARY, args, { stdio: ["ignore", "ignore", "pipe"] });

      let stderr = "";
      ytdlp.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });

      ytdlp.on("error", (err) => reject(err));
      ytdlp.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(stderr.trim() || `yt-dlp exited with code ${code}`));
      });
    });

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    await streamPipeline(createReadStream(outputPath), res);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
};

export const proxyDownload = async (req, res, next) => {
  const { url, filename, ext: extParam, formatId, pageUrl } = req.query;
  const ext = inferExt(typeof extParam === "string" ? extParam : "", url) || "mp4";
  const inferredName = safeFilename(filename || new URL(url).pathname.split("/").pop(), ext);

  const fail = (err) => {
    if (res.headersSent) res.end();
    else {
      err.status = err.status || 500;
      next(err);
    }
  };

  try {
    if (formatId && pageUrl) {
      await runYtDlpMerge(pageUrl, formatId, res, inferredName.endsWith(".mp4") ? inferredName : `${inferredName}.mp4`);
      return;
    }

    const upstream = await fetch(url, { redirect: "follow", headers: { Range: "bytes=0-" } });
    if (!upstream.ok || !upstream.body) {
      const error = new Error(`Upstream responded with ${upstream.status}`);
      error.status = 502;
      throw error;
    }

    const upstreamType = upstream.headers.get("content-type") || "";
    const contentType = extToContentType(ext) || upstreamType || "application/octet-stream";
    const contentLength = upstream.headers.get("content-length");

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${inferredName}"`);
    if (contentLength) res.setHeader("Content-Length", contentLength);

    await streamPipeline(upstream.body, res);
  } catch (err) {
    fail(err);
  }
};
