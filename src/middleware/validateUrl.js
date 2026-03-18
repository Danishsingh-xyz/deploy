import { platformRules, isValidHttpUrl, matchesPlatform } from "../utils/platforms.js";

export const requireUrl = (req, _res, next) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    const error = new Error("Query parameter 'url' is required");
    error.status = 400;
    next(error);
    return;
  }

  if (!isValidHttpUrl(url)) {
    const error = new Error("Only valid HTTP/HTTPS URLs are allowed");
    error.status = 400;
    next(error);
    return;
  }

  next();
};

export const requirePlatformUrl = (platform) => (req, _res, next) => {
  const { url } = req.query;

  if (!matchesPlatform(platform, url)) {
    const allowed = platformRules[platform]?.join(", ") || platform;
    const error = new Error(`The provided URL does not match supported domains: ${allowed}`);
    error.status = 400;
    next(error);
    return;
  }

  next();
};