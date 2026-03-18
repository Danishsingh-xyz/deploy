# SnapFetch Backend

Express backend for SnapFetch media tools.

## Features

- Platform endpoints for YouTube, Instagram, TikTok, Twitter/X, and Pinterest
- `yt-dlp` metadata extraction for downloadable format URLs
- URL validation by platform
- Basic rate limiting and security middleware
- Request logging with morgan
- Swagger docs at `/api/docs`

## Prerequisites

- Node.js 20+
- `yt-dlp` installed and available in PATH

Optional for advanced extraction/transcoding:

- `ffmpeg`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Server runs at `http://localhost:4000` by default.

## Endpoints

- `GET /api/youtube/mp4?url=`
- `GET /api/youtube/mp3?url=`
- `GET /api/youtube/thumbnail?url=`
- `GET /api/instagram/reel?url=`
- `GET /api/instagram/pfp?url=`
- `GET /api/tiktok/video?url=`
- `GET /api/twitter/video?url=`
- `GET /api/pinterest/video?url=`
- `GET /api/health`

## Notes

- MP3 endpoint returns best available audio formats. Exact MP3 output may require server-side transcoding.
- No database or authentication is included in this version.