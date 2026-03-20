import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Link2, ArrowRight, AlertCircle, Loader2, Download, Image as ImageIcon, Music, Video } from "lucide-react";

interface ResultOption {
  id?: string;
  ext?: string | null;
  quality?: string | null;
  width?: number | null;
  height?: number | null;
  url: string;
  audioCodec?: string | null;
  videoCodec?: string | null;
  bestAudioUrl?: string | null;
  bestAudioExt?: string | null;
}

interface SubtitleOption {
  lang?: string;
  ext?: string;
  url: string;
}

interface ToolPageProps {
  title: string;
  description: string;
  platform: string;
  apiPath: string;
}

interface ApiResponse {
  success: boolean;
  error?: { message?: string };
  media?: {
    title?: string | null;
    duration?: number | null;
    thumbnail?: string | null;
    subtitles?: SubtitleOption[];
  };
  result?: {
    kind?: "video" | "audio" | "thumbnail" | "profile-picture";
    options?: ResultOption[];
    subtitles?: SubtitleOption[];
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const formatDuration = (seconds?: number | null) => {
  if (!seconds || seconds < 1) return "Unknown";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

const makeOptionLabel = (option: ResultOption, kind?: string) => {
  if (kind === "thumbnail" || kind === "profile-picture") return "Download Image";
  const ext = option.ext ? option.ext.toUpperCase() : "File";
  const size = option.height ? `${option.height}p` : option.quality || "Best";
  const hasAudio = option.audioCodec && option.audioCodec !== "none";
  const needsMerge = !hasAudio && option.bestAudioUrl;
  const audioTag = kind === "video" ? (hasAudio ? " • AV" : needsMerge ? " • merge audio" : " • video-only") : "";
  return `Download ${ext}` + (size ? ` (${size})` : "") + audioTag;
};

const inferredFilename = (title?: string | null, ext?: string | null) => {
  const safe = (title || "download").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 80) || "download";
  if (ext && !safe.endsWith(`.${ext}`)) return `${safe}.${ext}`;
  return safe;
};

const dedupeByQuality = (opts: ResultOption[]) => {
  const map = new Map<string, ResultOption>();
  opts.forEach((opt) => {
    const key = String(opt.height || opt.quality || opt.id || opt.url);
    const existing = map.get(key);
    const currentHasAudio = opt.audioCodec && opt.audioCodec !== "none";
    const existingHasAudio = existing?.audioCodec && existing.audioCodec !== "none";
    if (!existing || (currentHasAudio && !existingHasAudio)) {
      map.set(key, opt);
    }
  });
  return Array.from(map.values());
};

const ToolPage = ({ title, description, platform, apiPath }: ToolPageProps) => {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get("url") || "");
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState("");
  const [options, setOptions] = useState<ResultOption[]>([]);
  const [kind, setKind] = useState<string>("video");
  const [subtitles, setSubtitles] = useState<SubtitleOption[]>([]);
  const [audioOnly, setAudioOnly] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const prefilled = searchParams.get("url");
    if (prefilled) {
      handleFetch(prefilled);
    }
  }, []);

  const triggerDownload = (downloadUrl: string, filename?: string, ext?: string | null, formatId?: string | null, bestAudioUrl?: string | null, bestAudioExt?: string | null) => {
    const params = new URLSearchParams({ url: downloadUrl });
    const safeName = inferredFilename(filename || mediaTitle, ext || undefined);
    if (ext) params.append("ext", ext);
    params.append("filename", safeName);
    if (bestAudioUrl) {
      params.append("audio", bestAudioUrl);
      if (bestAudioExt) params.append("audioExt", bestAudioExt);
    } else if (formatId && originalUrl) {
      params.append("formatId", formatId);
      params.append("pageUrl", originalUrl);
    }
    if (startTime) params.append("start", startTime);
    if (endTime) params.append("end", endTime);
    const proxyUrl = `${API_BASE_URL}/download?${params.toString()}`;
    const a = document.createElement("a");
    a.href = proxyUrl;
    a.download = safeName;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleFetch = async (inputUrl?: string) => {
    const u = inputUrl || url;
    if (!u.trim()) {
      setError("Please paste a URL");
      return;
    }

    setError("");
    setLoading(true);
    setFetched(false);

    try {
      const response = await fetch(`${API_BASE_URL}${apiPath}?url=${encodeURIComponent(u)}`);
      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to fetch media info");
      }

      setOriginalUrl(u);
      setMediaTitle(data.media?.title || "Untitled media");
      setMediaDuration(data.media?.duration ?? null);
      setThumbnail(data.media?.thumbnail || "");
      setSubtitles(data.result?.subtitles || data.media?.subtitles || []);
      setOptions(data.result?.options || []);
      setKind(data.result?.kind || "video");
      setFetched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredOptions = audioOnly
    ? options.filter((o) => (!o.videoCodec || o.videoCodec === "none") && o.audioCodec && o.audioCodec !== "none")
    : options;

  const displayedOptions = dedupeByQuality(filteredOptions).filter(
    (o) => (o.audioCodec && o.audioCodec !== "none") || (o.bestAudioUrl && o.bestAudioExt)
  );

  return (
    <Layout>
      <div className="container max-w-3xl py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-center">{title}</h1>
        <p className="text-muted-foreground text-center mb-10">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
                setFetched(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              placeholder={`Paste ${platform} URL here...`}
              className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button
            onClick={() => handleFetch()}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50 glow-accent"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ArrowRight className="h-5 w-5" /> Fetch</>}
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-sm text-destructive animate-fade-in">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={audioOnly}
              onChange={(e) => setAudioOnly(e.target.checked)}
              className="h-4 w-4"
            />
            Audio only
          </label>
          <input
            type="text"
            placeholder="Start (seconds)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="End (seconds)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          />
        </div>

        {loading && (
          <div className="rounded-xl border border-border bg-card p-12 text-center animate-fade-in">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Fetching media info...</p>
          </div>
        )}

        {fetched && !loading && (
          <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
            <div className="aspect-video bg-secondary flex items-center justify-center overflow-hidden">
              {thumbnail ? (
                <img src={thumbnail} alt={mediaTitle} className="h-full w-full object-cover" />
              ) : kind === "audio" ? (
                <Music className="h-16 w-16 text-muted-foreground/30" />
              ) : kind === "thumbnail" || kind === "profile-picture" ? (
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              ) : (
                <Video className="h-16 w-16 text-muted-foreground/30" />
              )}
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-lg mb-1">{mediaTitle}</h3>
              <p className="text-sm text-muted-foreground mb-6">Duration: {formatDuration(mediaDuration)} - Platform: {platform}</p>

              {displayedOptions.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {displayedOptions.slice(0, 12).map((opt, i) => (
                    <button
                      key={`${opt.id || "opt"}-${i}`}
                      onClick={() => triggerDownload(opt.url, mediaTitle || undefined, opt.ext || null, opt.id || null, opt.bestAudioUrl || null, opt.bestAudioExt || null)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      <Download className="h-4 w-4" />
                      {makeOptionLabel(opt, kind)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No playable formats found.</p>
              )}

              {subtitles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-sm mb-2">Subtitles / Captions</h4>
                  <div className="flex flex-wrap gap-2">
                    {subtitles.slice(0, 6).map((sub, idx) => (
                      <button
                        key={`${sub.lang || "sub"}-${idx}`}
                        onClick={() => triggerDownload(sub.url, `${mediaTitle || "subtitle"}.${sub.ext || "vtt"}`, sub.ext || "vtt")}
                        className="rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium hover:bg-primary hover:text-primary-foreground"
                      >
                        {sub.lang || "sub"} ({sub.ext || "vtt"})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ToolPage;
