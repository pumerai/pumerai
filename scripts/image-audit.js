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

let totalImgs = 0;
let missingAlt = 0;
let emptyAlt = 0;
let missingSrc = 0;
let missingFile = 0;

for (const f of filesToCheck) {
  const filePath = path.resolve(distDir, f);
  const html = fs.readFileSync(filePath, "utf-8");
  const imgMatches = [...html.matchAll(/<img\s+([^>]*?)>/gi)];

  for (const m of imgMatches) {
    totalImgs++;
    const attrs = m[1];
    const srcMatch = attrs.match(/src=["'](.*?)["']/i);
    const altMatch = attrs.match(/alt=["'](.*?)["']/i);

    if (!srcMatch) {
      missingSrc++;
      console.warn(`[${f}] Missing src:`, attrs);
    } else {
      const src = srcMatch[1];
      if (src.startsWith("/") && !src.startsWith("//")) {
        const localPath = path.resolve(distDir, src.replace(/^\//, ""));
        if (!fs.existsSync(localPath)) {
          missingFile++;
          console.warn(`[${f}] Image file missing on disk:`, src);
        }
      }
    }

    if (!altMatch) {
      missingAlt++;
      console.warn(`[${f}] Missing alt:`, attrs);
    } else if (altMatch[1].trim() === "") {
      // Empty alt is acceptable only if role="presentation" or aria-hidden="true"
      if (!attrs.includes('role="presentation"') && !attrs.includes('aria-hidden="true"')) {
        emptyAlt++;
        console.warn(`[${f}] Empty alt without aria-hidden:`, attrs);
      }
    }
  }
}

console.log("=== Image Audit Results ===");
console.log(`Total images checked: ${totalImgs}`);
console.log(`Missing src: ${missingSrc}`);
console.log(`Missing alt: ${missingAlt}`);
console.log(`Empty alt (unintended): ${emptyAlt}`);
console.log(`Missing image files on disk: ${missingFile}`);
if (missingAlt === 0 && emptyAlt === 0 && missingFile === 0) {
  console.log("✓ Image audit PASSED: All images have descriptive alt text and exist on disk!");
}
