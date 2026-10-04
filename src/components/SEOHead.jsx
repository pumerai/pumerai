import { useEffect } from "react";
import { getPageMeta, generateStructuredData, siteConfig } from "../utils/seo.js";

function setOrCreateMeta(nameOrProp, attrValue, content) {
  if (typeof document === "undefined") return;
  let element = document.querySelector(`meta[${nameOrProp}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(nameOrProp, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel, href, extraAttrs = {}) {
  if (typeof document === "undefined") return;
  const selector = `link[rel="${rel}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    for (const [key, val] of Object.entries(extraAttrs)) {
      element.setAttribute(key, val);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEOHead({ path = "/" }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const meta = getPageMeta(path);

    // 1. Title Tag
    document.title = meta.title;

    // 2. Meta Description
    setOrCreateMeta("name", "description", meta.description);

    // 3. Canonical URL
    setOrCreateLink("canonical", meta.canonical);

    // 4. Robots indexing
    if (meta.noindex) {
      setOrCreateMeta("name", "robots", "noindex, follow");
    } else {
      setOrCreateMeta("name", "robots", "index, follow");
    }

    // 6. Geographic Tags
    setOrCreateMeta("name", "geo.region", "IN-KA");
    setOrCreateMeta("name", "geo.placename", "Honnavar");
    setOrCreateMeta("name", "geo.position", `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`);
    setOrCreateMeta("name", "ICBM", `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`);

    // 7. Open Graph Tags
    setOrCreateMeta("property", "og:title", meta.title);
    setOrCreateMeta("property", "og:description", meta.description);
    setOrCreateMeta("property", "og:url", meta.canonical);
    setOrCreateMeta("property", "og:site_name", siteConfig.name);
    setOrCreateMeta("property", "og:type", "website");
    setOrCreateMeta("property", "og:locale", "en_IN");
    setOrCreateMeta("property", "og:image", siteConfig.ogImage);

    // 8. Twitter Card Tags
    setOrCreateMeta("name", "twitter:card", "summary_large_image");
    setOrCreateMeta("name", "twitter:title", meta.title);
    setOrCreateMeta("name", "twitter:description", meta.description);
    setOrCreateMeta("name", "twitter:image", siteConfig.ogImage);

    // 9. JSON-LD Structured Data
    const structuredData = generateStructuredData(path);
    let scriptTag = document.getElementById("pumerai-structured-data");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "pumerai-structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }, [path]);

  return null;
}
