import { URL } from "node:url";
import { env } from "../config/env.js";

const extractUsername = (profileUrl) => {
  try {
    const url = new URL(profileUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
};

const buildHeaders = (username, acceptJson = true) => {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    Referer: `https://www.instagram.com/${username}/`
  };
  if (acceptJson) headers.Accept = "application/json";
  if (env.INSTAGRAM_SESSIONID) {
    headers.Cookie = `sessionid=${env.INSTAGRAM_SESSIONID}`;
  }
  return headers;
};

const tryWebProfileInfo = async (username) => {
  const endpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;
  const resp = await fetch(endpoint, { headers: buildHeaders(username) });
  if (!resp.ok) return null;
  const json = await resp.json();
  return json?.data?.user?.hd_profile_pic_url_info?.url || json?.data?.user?.profile_pic_url_hd || null;
};

const tryLegacyAParam = async (username) => {
  const endpoint = `https://www.instagram.com/${encodeURIComponent(username)}/?__a=1&__d=dis`;
  const resp = await fetch(endpoint, { headers: buildHeaders(username) });
  if (!resp.ok) return null;
  const json = await resp.json();
  return json?.graphql?.user?.profile_pic_url_hd || json?.graphql?.user?.profile_pic_url || null;
};

const tryHtmlScrape = async (username) => {
  const endpoint = `https://www.instagram.com/${encodeURIComponent(username)}/`;
  const resp = await fetch(endpoint, { headers: buildHeaders(username, false) });
  if (!resp.ok) return null;
  const html = await resp.text();
  const regex = /"profile_pic_url_hd":"(https?:\\\/\\\/[^\"]+)"/;
  const match = regex.exec(html);
  if (match && match[1]) {
    return match[1].replace(/\\u0026/g, "&").replace(/\\\\\//g, "/");
  }
  return null;
};

export const fetchInstagramProfilePicture = async (profileUrl) => {
  const username = extractUsername(profileUrl);
  if (!username) return null;

  try {
    const viaWebInfo = await tryWebProfileInfo(username);
    if (viaWebInfo) return viaWebInfo;
    const viaLegacy = await tryLegacyAParam(username);
    if (viaLegacy) return viaLegacy;
    const viaHtml = await tryHtmlScrape(username);
    if (viaHtml) return viaHtml;
  } catch {
    return null;
  }

  return null;
};