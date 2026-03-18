const isVideoFormat = (format) => format.videoCodec && format.videoCodec !== "none";
const isAudioOnlyFormat = (format) => format.audioCodec && format.audioCodec !== "none" && (!format.videoCodec || format.videoCodec === "none");

const prioritizeMp4Videos = (formats) =>
  formats
    .filter((f) => isVideoFormat(f) && f.ext === "mp4")
    .sort((a, b) => (a.height || 0) - (b.height || 0));

const prioritizeAudio = (formats) => {
  const preferred = ["m4a", "mp3", "webm", "opus"];
  const sorted = [...formats].sort((a, b) => {
    const aRank = preferred.indexOf(a.ext);
    const bRank = preferred.indexOf(b.ext);
    return (aRank === -1 ? 999 : aRank) - (bRank === -1 ? 999 : bRank);
  });
  return sorted;
};

const extFromUrl = (url) => {
  try {
    const pathname = new URL(url).pathname;
    const m = pathname.match(/\.([a-zA-Z0-9]+)$/);
    return m ? m[1].toLowerCase() : null;
  } catch {
    return null;
  }
};

export const buildToolPayload = (toolType, mediaInfo) => {
  const { formats, subtitles = [] } = mediaInfo;
  const audioOnly = formats.filter(isAudioOnlyFormat);
  const bestAudio = prioritizeAudio(audioOnly)[0] || null;

  switch (toolType) {
    case "video": {
      const videos = prioritizeMp4Videos(formats).map((v) => ({
        ...v,
        bestAudioUrl: v.audioCodec && v.audioCodec !== "none" ? null : bestAudio?.url || null,
        bestAudioExt: v.audioCodec && v.audioCodec !== "none" ? null : bestAudio?.ext || null
      }));
      return {
        kind: "video",
        options: videos,
        subtitles
      };
    }
    case "audio": {
      const audios = prioritizeAudio(audioOnly);
      return {
        kind: "audio",
        options: audios,
        subtitles
      };
    }
    case "thumbnail": {
      const thumbExt = extFromUrl(mediaInfo.thumbnail) || "jpg";
      return {
        kind: "thumbnail",
        options: mediaInfo.thumbnail ? [{ url: mediaInfo.thumbnail, ext: thumbExt }] : [],
        subtitles: []
      };
    }
    case "profile-picture": {
      const imgExt = extFromUrl(mediaInfo.thumbnail) || "jpg";
      return {
        kind: "profile-picture",
        options: mediaInfo.thumbnail ? [{ url: mediaInfo.thumbnail, ext: imgExt }] : [],
        subtitles: []
      };
    }
    default:
      return {
        kind: "unknown",
        options: [],
        subtitles
      };
  }
};