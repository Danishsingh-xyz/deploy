FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-pip ffmpeg \
  && pip3 install --break-system-packages --no-cache-dir yt-dlp \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src
COPY .env.example ./.env.example
COPY README.md ./README.md

ENV NODE_ENV=production
ENV YTDLP_BINARY=yt-dlp
ENV FFMPEG_BINARY=ffmpeg

EXPOSE 4000

CMD ["npm", "start"]
