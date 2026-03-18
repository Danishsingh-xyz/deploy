import { Video, Music, Image, Film, Twitter, Pin } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: typeof Video;
  path: string;
  platform: string;
  color: string;
}

export const tools: Tool[] = [
  {
    id: "youtube-mp4",
    name: "YouTube to MP4",
    description: "Download YouTube videos in multiple qualities up to 1080p",
    icon: Video,
    path: "/tools/youtube-mp4",
    platform: "youtube",
    color: "hsl(0 100% 50%)",
  },
  {
    id: "youtube-mp3",
    name: "YouTube to MP3",
    description: "Convert YouTube videos to high quality MP3 audio files",
    icon: Music,
    path: "/tools/youtube-mp3",
    platform: "youtube",
    color: "hsl(0 100% 50%)",
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail",
    description: "Download YouTube thumbnails in Max, HD, and SD resolution",
    icon: Image,
    path: "/tools/youtube-thumbnail",
    platform: "youtube",
    color: "hsl(0 100% 50%)",
  },
  {
    id: "instagram-reels",
    name: "Instagram Reels",
    description: "Download Instagram Reels videos quickly and easily",
    icon: Film,
    path: "/tools/instagram-reel",
    platform: "instagram",
    color: "hsl(330 80% 55%)",
  },
  {
    id: "twitter",
    name: "Twitter/X Video",
    description: "Download videos from Twitter/X posts instantly",
    icon: Twitter,
    path: "/tools/twitter",
    platform: "twitter",
    color: "hsl(200 90% 55%)",
  },
  {
    id: "pinterest",
    name: "Pinterest Video",
    description: "Download Pinterest videos in the best available quality",
    icon: Pin,
    path: "/tools/pinterest",
    platform: "pinterest",
    color: "hsl(0 80% 50%)",
  },
  {
    id: "facebook",
    name: "Facebook Video",
    description: "Download public Facebook videos in MP4",
    icon: Video,
    path: "/tools/facebook",
    platform: "facebook",
    color: "hsl(221 44% 41%)",
  },
  {
    id: "reddit",
    name: "Reddit Video",
    description: "Download Reddit-hosted videos",
    icon: Video,
    path: "/tools/reddit",
    platform: "reddit",
    color: "hsl(16 100% 50%)",
  },
];

export function detectPlatform(url: string): string | null {
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube";
  if (/instagram\.com/i.test(url)) return "instagram";
  if (/twitter\.com|x\.com/i.test(url)) return "twitter";
  if (/pinterest\.com|pin\.it/i.test(url)) return "pinterest";
  if (/facebook\.com|fb\.watch/i.test(url)) return "facebook";
  if (/reddit\.com|redd\.it/i.test(url)) return "reddit";
  return null;
}

export function getDefaultToolForPlatform(platform: string): string {
  const map: Record<string, string> = {
    youtube: "/tools/youtube-mp4",
    instagram: "/tools/instagram-reel",
    twitter: "/tools/twitter",
    pinterest: "/tools/pinterest",
    facebook: "/tools/facebook",
    reddit: "/tools/reddit",
  };
  return map[platform] || "/";
}