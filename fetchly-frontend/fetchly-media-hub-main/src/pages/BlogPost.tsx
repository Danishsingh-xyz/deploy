import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";

const articles: Record<string, { title: string; content: string[] }> = {
  "how-to-download-youtube-videos": {
    title: "How to Download YouTube Videos",
    content: [
      "Downloading YouTube videos has never been easier. With Fetchly, you can save any YouTube video in qualities ranging from 144p to 1080p.",
      "Step 1: Copy the YouTube video URL from your browser or the YouTube app.",
      "Step 2: Paste the URL into the Fetchly YouTube to MP4 tool.",
      "Step 3: Click 'Fetch' and wait for the video info to load.",
      "Step 4: Choose your preferred quality and click download.",
      "That's it! Your video will start downloading immediately. Fetchly works on both desktop and mobile browsers.",
    ],
  },
  "how-to-download-instagram-reels": {
    title: "How to Download Instagram Reels",
    content: [
      "Instagram Reels are short, entertaining videos that you might want to save for later. Fetchly makes it simple.",
      "Step 1: Open the Instagram Reel and tap the share button, then 'Copy Link'.",
      "Step 2: Go to Fetchly's Instagram Reels Downloader tool.",
      "Step 3: Paste the link and click 'Fetch'.",
      "Step 4: Download the Reel to your device.",
      "The video will be saved in its original quality. No watermarks, no sign-ups required.",
    ],
  },
  "how-to-download-tiktok-videos": {
    title: "How to Download TikTok Videos",
    content: [
      "Want to save a TikTok video? Fetchly lets you download TikTok videos with or without the watermark.",
      "Step 1: Open the TikTok video and tap 'Share', then 'Copy Link'.",
      "Step 2: Visit Fetchly's TikTok Video Downloader.",
      "Step 3: Paste the link and click 'Fetch'.",
      "Step 4: Choose to download with or without watermark.",
      "Your video will be ready to save in seconds. Fetchly is fully mobile-friendly for on-the-go downloads.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const article = articles[slug || ""];

  if (!article) {
    return (
      <Layout>
        <div className="container max-w-2xl py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl py-16 md:py-24">
        <Link to="/blog" className="text-sm text-primary hover:underline mb-6 inline-block">← Back to Blog</Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">{article.title}</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {article.content.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
