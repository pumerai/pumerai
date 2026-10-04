import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const distSsrDir = path.resolve(rootDir, "dist-ssr");

const ROUTES = [
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

function escapeTitle(str = "") {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str = "") {
  return str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function run() {
  console.log("=== Step 1: Building SSR Bundle for Pre-rendering ===");
  await build({
    configFile: path.resolve(rootDir, "vite.config.js"),
    build: {
      ssr: path.resolve(rootDir, "src/entry-server.jsx"),
      outDir: distSsrDir,
      emptyOutDir: true,
      sourcemap: false,
    },
  });

  console.log("=== Step 2: Loading SSR Entry and SEO Metadata ===");
  const ssrModulePath = path.resolve(distSsrDir, "entry-server.js");
  const { render } = await import(`file://${ssrModulePath.replace(/\\/g, "/")}`);
  const { routesMeta, generateStructuredData, siteConfig } = await import(
    `file://${path.resolve(rootDir, "src/utils/seo.js").replace(/\\/g, "/")}`
  );

  const baseTemplatePath = path.resolve(distDir, "index.html");
  if (!fs.existsSync(baseTemplatePath)) {
    throw new Error("Client build dist/index.html not found. Run client build first.");
  }
  const baseHtml = await fsp.readFile(baseTemplatePath, "utf-8");

  console.log("=== Step 3: Pre-rendering Static Routes ===");
  for (const route of ROUTES) {
    const meta = routesMeta[route] || routesMeta["/"];
    const structuredData = generateStructuredData(route);
    const appHtml = render(route);

    let html = baseHtml;

    // 1. Inject rendered React HTML into root
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // 2. Title Tag
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeTitle(meta.title)}</title>`);

    // 3. Meta Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${escapeAttr(meta.description)}" />`
    );

    // 4. Canonical Link
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );

    // 5. Hreflang Link
    html = html.replace(
      /<link\s+rel="alternate"\s+hreflang="en-IN"\s+href=".*?"\s*\/?>/i,
      `<link rel="alternate" hreflang="en-IN" href="${meta.canonical}" />`
    );

    // 6. Open Graph Meta Tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeAttr(meta.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${meta.canonical}" />`
    );

    // 7. Twitter Meta Tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`
    );

    // 8. Robots meta (noindex for privacy, cancellation, 404)
    if (meta.noindex) {
      if (/<meta\s+name="robots"/i.test(html)) {
        html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/i, '<meta name="robots" content="noindex, follow" />');
      } else {
        html = html.replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
      }
    }

    // 9. Structured Data JSON-LD
    const jsonLdString = JSON.stringify(structuredData, null, 2);
    html = html.replace(
      /<script id="pumerai-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script id="pumerai-structured-data" type="application/ld+json">\n${jsonLdString}\n    </script>`
    );

    // 10. Write output file
    let targetFile;
    if (route === "/") {
      targetFile = path.resolve(distDir, "index.html");
    } else if (route === "/404") {
      targetFile = path.resolve(distDir, "404.html");
    } else {
      const targetDir = path.resolve(distDir, route.replace(/^\//, ""));
      await fsp.mkdir(targetDir, { recursive: true });
      targetFile = path.resolve(targetDir, "index.html");
    }

    await fsp.writeFile(targetFile, html, "utf-8");
    console.log(`✓ Pre-rendered: ${route} -> ${path.relative(rootDir, targetFile)} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  console.log("=== Step 4: Cleaning Up SSR Temp Files ===");
  await fsp.rm(distSsrDir, { recursive: true, force: true });
  console.log("=== Pre-rendering Completed Successfully ===");
}

run().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
