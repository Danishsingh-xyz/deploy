export const platformRules = {
  youtube: ["youtube.com", "youtu.be"],
  instagram: ["instagram.com"],
  tiktok: ["tiktok.com"],
  twitter: ["twitter.com", "x.com"],
  pinterest: ["pinterest.com", "pin.it"],
  facebook: ["facebook.com", "fb.watch"],
  reddit: ["reddit.com", "redd.it"]
};

export const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const matchesPlatform = (platform, value) => {
  if (!isValidHttpUrl(value)) return false;

  const hostname = new URL(value).hostname.toLowerCase();
  const allowedDomains = platformRules[platform] || [];

  return allowedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
};