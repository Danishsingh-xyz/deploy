import { spawn } from "node:child_process";
import { env } from "../config/env.js";

const parseJsonOutput = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Unable to parse yt-dlp response");
  }
};

const normalizeFormats = (info) => {
  if (!Array.isArray(info.formats)) return [];

  return info.formats
    .filter((item) => item && typeof item.url === "string")
    .map((item) => ({
      id: item.format_id,
      ext: item.ext || null,
      quality: item.format_note || item.format || null,
      width: item.width || null,
      height: item.height || null,
      fps: item.fps || null,
      fileSize: item.filesize || item.filesize_approx || null,
      videoCodec: item.vcodec || null,
      audioCodec: item.acodec || null,
      abr: item.abr || null,
      vbr: item.vbr || null,
      tbr: item.tbr || null,
      url: item.url
    }));
};

const normalizeSubtitles = (info) => {
  const collect = (subsObj) => {
    if (!subsObj || typeof subsObj !== "object") return [];
    return Object.entries(subsObj).flatMap(([lang, tracks]) =>
      (tracks || []).map((track) => ({ lang, ext: track.ext, url: track.url }))
    );
  };
  const subs = collect(info.subtitles);
  const auto = collect(info.automatic_captions);
  return [...subs, ...auto];
};

export const extractMediaInfo = (targetUrl) =>
  new Promise((resolve, reject) => {
    const args = [
      "--dump-single-json",
      "--no-warnings",
      "--no-playlist",
      "--skip-download",
      "--write-auto-subs",
      "--write-subs",
      targetUrl
    ];

    const child = spawn(env.YTDLP_BINARY, args, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(new Error(`Failed to start yt-dlp: ${error.message}`));
    });

    child.on("close", (code) => {
      if (code !== 0) {
        const message = stderr.trim() || "yt-dlp failed to extract media";
        reject(new Error(message));
        return;
      }

      const info = parseJsonOutput(stdout);
      const formats = normalizeFormats(info);
      const subtitles = normalizeSubtitles(info);

      resolve({
        id: info.id || null,
        title: info.title || null,
        duration: info.duration || null,
        uploader: info.uploader || info.channel || null,
        webpageUrl: info.webpage_url || targetUrl,
        thumbnail: info.thumbnail || (Array.isArray(info.thumbnails) ? info.thumbnails.at(-1)?.url : null),
        formats,
        subtitles
      });
    });
  });