import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { env } from "../config/env.js";

export const prepareYtDlpCookieArgs = async () => {
  if (!env.YOUTUBE_COOKIES) {
    return {
      args: [],
      cleanup: async () => {}
    };
  }

  const tempDir = await mkdtemp(join(tmpdir(), "snapfetch-cookies-"));
  const cookiePath = join(tempDir, "youtube-cookies.txt");
  const cookieContent = env.YOUTUBE_COOKIES.replace(/\\n/g, "\n").trim();

  await writeFile(cookiePath, `${cookieContent}\n`, "utf8");

  return {
    args: ["--cookies", cookiePath],
    cleanup: async () => {
      await rm(tempDir, { recursive: true, force: true });
    }
  };
};
