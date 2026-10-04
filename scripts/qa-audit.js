import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

const pages = [
  { route: "/", file: path.resolve(distDir, "index.html") },
  { route: "/rooms", file: path.resolve(distDir, "rooms", "index.html") },
  { route: "/banquet", file: path.resolve(distDir, "banquet", "index.html") },
  { route: "/dining", file: path.resolve(distDir, "dining", "index.html") },
  { route: "/gallery", file: path.resolve(distDir, "gallery", "index.html") },
  { route: "/location", file: path.resolve(distDir, "location", "index.html") },
  { route: "/contact", file: path.resolve(distDir, "contact", "index.html") },
  { route: "/faq", file: path.resolve(distDir, "faq", "index.html") },
  { route: "/privacy", file: path.resolve(distDir, "privacy", "index.html") },
  { route: "/cancellation", file: path.resolve(distDir, "cancellation", "index.html") },
  { route: "/404", file: path.resolve(distDir, "404.html") },
];

const results = [];

for (const p of pages) {
  const content = fs.readFileSync(p.file, "utf-8");

  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "MISSING";

  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : "MISSING";

  const canMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const can = canMatch ? canMatch[1].trim() : "MISSING";

  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let h1 = "MISSING";
  if (h1Match) {
    h1 = h1Match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }

  const imgMatches = [...content.matchAll(/<img\s+([^>]*?)>/gi)];
  let imgCount = imgMatches.length;
  let imgsWithAlt = 0;
  for (const m of imgMatches) {
    if (m[1].includes("alt=")) imgsWithAlt++;
  }

  const schemaMatch = content.match(/<script id=["']pumerai-structured-data["'] type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  let schemaTypes = [];
  let validationErrors = [];
  if (schemaMatch) {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of list) {
        if (item["@type"]) {
          if (item["containsPlace"]) {
            const innerTypes = item["containsPlace"].map((x) => x["@type"]).filter(Boolean);
            schemaTypes.push(`${item["@type"]} (with ${innerTypes.length} ${innerTypes[0]}s)`);
          } else {
            schemaTypes.push(item["@type"]);
          }
        }
      }
    } catch (e) {
      validationErrors.push("JSON parse error: " + e.message);
    }
  } else {
    validationErrors.push("Missing structured data script tag");
  }

  results.push({
    route: p.route,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    can,
    h1,
    imgCount,
    imgsWithAlt,
    schemaTypes: schemaTypes.join(", "),
    errors: validationErrors.length === 0 ? "None" : validationErrors.join("; "),
  });
}

console.log(JSON.stringify(results, null, 2));
