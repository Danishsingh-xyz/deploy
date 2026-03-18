import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background py-12">
    <div className="container grid gap-8 sm:grid-cols-2 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2 text-lg font-bold mb-3">
          <Zap className="h-5 w-5 text-primary" />
          Fetchly
        </div>
        <p className="text-sm text-muted-foreground">Download media from any platform instantly. Fast, free, and simple.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Tools</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/tools/youtube-mp4" className="hover:text-foreground transition-colors">YouTube to MP4</Link>
          <Link to="/tools/youtube-mp3" className="hover:text-foreground transition-colors">YouTube to MP3</Link>
          <Link to="/tools/instagram-reel" className="hover:text-foreground transition-colors">Instagram Reels</Link>
          <Link to="/tools/facebook" className="hover:text-foreground transition-colors">Facebook Video</Link>
          <Link to="/tools/reddit" className="hover:text-foreground transition-colors">Reddit Video</Link>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Resources</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Legal</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
    <div className="container mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Fetchly. All rights reserved.
    </div>
  </footer>
);

export default Footer;