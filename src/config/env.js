import dotenv from "dotenv";

dotenv.config();

const asNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: asNumber(process.env.PORT, 4000),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "*",
  YTDLP_BINARY: process.env.YTDLP_BINARY || "yt-dlp",
  FFMPEG_BINARY: process.env.FFMPEG_BINARY || "ffmpeg",
  YOUTUBE_COOKIES: process.env.YOUTUBE_COOKIES || "",
  RATE_LIMIT_WINDOW_MS: asNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  RATE_LIMIT_MAX: asNumber(process.env.RATE_LIMIT_MAX, 30),
  INSTAGRAM_SESSIONID: process.env.INSTAGRAM_SESSIONID || ""
};
