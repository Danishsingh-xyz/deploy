import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, ArrowRight, AlertCircle } from "lucide-react";
import { detectPlatform, getDefaultToolForPlatform } from "@/lib/tools";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please paste a URL");
      return;
    }
    const platform = detectPlatform(url);
    if (!platform) {
      setError("Unsupported link. Try YouTube, Instagram, Twitter/X, Pinterest, Facebook, or Reddit.");
      return;
    }
    setError("");
    const path = getDefaultToolForPlatform(platform);
    navigate(`${path}?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Paste your link here..."
            className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] glow-accent"
        >
          Detect & Download
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-destructive animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default UrlInput;