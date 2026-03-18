import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const blogPosts = [
  { slug: "how-to-download-youtube-videos", title: "How to Download YouTube Videos", desc: "A complete guide to downloading YouTube videos in any quality using Fetchly." },
  { slug: "how-to-download-instagram-reels", title: "How to Download Instagram Reels", desc: "Learn how to save Instagram Reels to your device in just a few steps." },
  { slug: "how-to-download-tiktok-videos", title: "How to Download TikTok Videos", desc: "Download TikTok videos with or without watermark using Fetchly." },
];

const Blog = () => (
  <Layout>
    <div className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block rounded-xl border border-border bg-card p-6 card-hover">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-muted-foreground">{post.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </Layout>
);

export default Blog;
