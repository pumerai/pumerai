import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

const filesToCheck = [
  "index.html",
  "rooms/index.html",
  "banquet/index.html",
  "dining/index.html",
  "gallery/index.html",
  "location/index.html",
  "contact/index.html",
  "faq/index.html",
];

const internalLinks = new Set();
const brokenLinks = [];

for (const f of filesToCheck) {
  const filePath = path.resolve(distDir, f);
  if (!fs.existsSync(filePath)) {
    brokenLinks.push({ source: f, target: "FILE_MISSING", error: "Source HTML file not found" });
    continue;
  }
  const html = fs.readFileSync(filePath, "utf-8");

  // Extract all hrefs
  const matches = [...html.matchAll(/href=["'](.*?)["']/gi)];
  for (const m of matches) {
    const href = m[1];
    if (href.startsWith("/") && !href.startsWith("//")) {
      internalLinks.add({ source: f, target: href });
    }
  }
}

// Verify each internal link target
for (const link of internalLinks) {
  const cleanTarget = link.target.split("#")[0].split("?")[0];
  if (!cleanTarget || cleanTarget === "/") continue;

  const targetPath = cleanTarget.replace(/^\//, "");
  // Target could be an asset or a route
  const possiblePaths = [
    path.resolve(distDir, targetPath),
    path.resolve(distDir, targetPath, "index.html"),
    path.resolve(distDir, `${targetPath}.html`),
  ];

  const exists = possiblePaths.some((p) => fs.existsSync(p));
  if (!exists) {
    brokenLinks.push(link);
  }
}

console.log("=== Internal Link Verification ===");
console.log(`Total internal links checked: ${internalLinks.size}`);
if (brokenLinks.length === 0) {
  console.log("✓ All internal links resolve to existing pre-rendered HTML or static assets!");
} else {
  console.error("Broken links found:", brokenLinks);
  process.exit(1);
}
