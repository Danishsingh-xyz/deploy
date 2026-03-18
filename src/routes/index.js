import express from "express";
import { handleDownload } from "../controllers/downloadController.js";
import { proxyDownload } from "../controllers/proxyController.js";
import { requirePlatformUrl, requireUrl } from "../middleware/validateUrl.js";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

// Direct download proxy to force Content-Disposition
router.get("/download", requireUrl, proxyDownload);

/**
 * @openapi
 * /api/youtube/mp4:
 *   get:
 *     tags: [YouTube]
 *     summary: Fetch YouTube video download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/youtube/mp4", requireUrl, requirePlatformUrl("youtube"), handleDownload("youtube-mp4"));

/**
 * @openapi
 * /api/youtube/mp3:
 *   get:
 *     tags: [YouTube]
 *     summary: Fetch YouTube audio download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/youtube/mp3", requireUrl, requirePlatformUrl("youtube"), handleDownload("youtube-mp3"));

/**
 * @openapi
 * /api/youtube/thumbnail:
 *   get:
 *     tags: [YouTube]
 *     summary: Fetch YouTube thumbnail
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/youtube/thumbnail", requireUrl, requirePlatformUrl("youtube"), handleDownload("youtube-thumbnail"));

/**
 * @openapi
 * /api/instagram/reel:
 *   get:
 *     tags: [Instagram]
 *     summary: Fetch Instagram reel download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/instagram/reel", requireUrl, requirePlatformUrl("instagram"), handleDownload("instagram-reel"));

/**
 * @openapi
 * /api/pinterest/video:
 *   get:
 *     tags: [Pinterest]
 *     summary: Fetch Pinterest video download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/pinterest/video", requireUrl, requirePlatformUrl("pinterest"), handleDownload("pinterest-video"));

/**
 * @openapi
 * /api/twitter/video:
 *   get:
 *     tags: [Twitter]
 *     summary: Fetch Twitter/X video download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/twitter/video", requireUrl, requirePlatformUrl("twitter"), handleDownload("twitter-video"));

/**
 * @openapi
 * /api/facebook/video:
 *   get:
 *     tags: [Facebook]
 *     summary: Fetch Facebook video download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/facebook/video", requireUrl, requirePlatformUrl("facebook"), handleDownload("facebook-video"));

/**
 * @openapi
 * /api/reddit/video:
 *   get:
 *     tags: [Reddit]
 *     summary: Fetch Reddit video download options
 *     parameters:
 *       - $ref: '#/components/parameters/UrlQuery'
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/reddit/video", requireUrl, requirePlatformUrl("reddit"), handleDownload("reddit-video"));

export default router;