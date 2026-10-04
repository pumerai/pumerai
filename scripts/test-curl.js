import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

const server = http.createServer((req, res) => {
  const reqPath = req.url.split("?")[0];
  let filePath;

  if (reqPath === "/") {
    filePath = path.join(distDir, "index.html");
  } else if (reqPath === "/404") {
    filePath = path.join(distDir, "404.html");
  } else {
    const candidateDir = path.join(distDir, reqPath.replace(/^\//, ""), "index.html");
    const candidateFile = path.join(distDir, reqPath.replace(/^\//, ""));
    if (fs.existsSync(candidateDir)) {
      filePath = candidateDir;
    } else if (fs.existsSync(candidateFile) && fs.statSync(candidateFile).isFile()) {
      filePath = candidateFile;
    } else {
      filePath = path.join(distDir, "index.html");
    }
  }

  if (fs.existsSync(filePath)) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Not found");
  }
});

server.listen(4199, "127.0.0.1", async () => {
  const routes = [
    "/",
    "/rooms",
    "/banquet",
    "/dining",
    "/gallery",
    "/location",
    "/contact",
    "/faq",
    "/privacy",
    "/cancellation",
    "/404",
  ];
  console.log("=== Proof: Raw HTML Curl Output (Without JavaScript) ===");

  for (const r of routes) {
    await new Promise((resolve) => {
      http.get("http://127.0.0.1:4199" + r, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
          const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "NONE";
          const hasSchema = data.includes("application/ld+json");
          const hasMeta = data.includes('name="description"');
          const hasCanonical = data.includes('rel="canonical"');
          console.log(
            `Route: ${r.padEnd(14)} | Status: ${res.statusCode} | Raw H1: "${h1}" | Schema: ${hasSchema ? "YES" : "NO"} | Meta: ${hasMeta ? "YES" : "NO"} | Canonical: ${hasCanonical ? "YES" : "NO"} | Size: ${(data.length / 1024).toFixed(1)} KB`
          );
          resolve();
        });
      });
    });
  }
  server.close();
});
