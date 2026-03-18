import { extractMediaInfo } from "../services/ytDlpService.js";
import { buildToolPayload } from "../utils/formatters.js";

const endpointConfig = {
  "youtube-mp4": { platform: "youtube", tool: "video" },
  "youtube-mp3": { platform: "youtube", tool: "audio" },
  "youtube-thumbnail": { platform: "youtube", tool: "thumbnail" },
  "instagram-reel": { platform: "instagram", tool: "video" },
  "pinterest-video": { platform: "pinterest", tool: "video" },
  "twitter-video": { platform: "twitter", tool: "video" },
  "facebook-video": { platform: "facebook", tool: "video" },
  "reddit-video": { platform: "reddit", tool: "video" }
};

export const handleDownload = (configKey) => async (req, res, next) => {
  const config = endpointConfig[configKey];

  if (!config) {
    const error = new Error("Unsupported download endpoint");
    error.status = 404;
    next(error);
    return;
  }

  try {
    const mediaInfo = await extractMediaInfo(req.query.url);
    const payload = buildToolPayload(config.tool, mediaInfo);

    res.json({
      success: true,
      request: {
        platform: config.platform,
        tool: config.tool,
        url: req.query.url,
        timestamp: new Date().toISOString()
      },
      media: {
        id: mediaInfo.id,
        title: mediaInfo.title,
        duration: mediaInfo.duration,
        uploader: mediaInfo.uploader,
        webpageUrl: mediaInfo.webpageUrl,
        thumbnail: mediaInfo.thumbnail,
        subtitles: mediaInfo.subtitles || []
      },
      result: payload
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};