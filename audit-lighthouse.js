const fs = require("fs");
const path = require("path");

const projectDir = "C:\\Users\\Shakil\\Desktop\\syncline-website_current";

const patterns = [
  { label: "Images missing width/height", regex: /<img(?!.*width=)(?!.*height=)/ },
  { label: "LCP image missing fetchpriority", regex: /workspace-tools(?!.*fetchpriority)/ },
  { label: "Lazy-loaded LCP images", regex: /workspace-tools.*loading="lazy"/ },
  { label: "Render-blocking Inter font", regex: /inter\.css/ },
  { label: "Vendor JS bundles (unused JS)", regex: /vendor-.*\.js/ },
  { label: "Non-descriptive SEO links", regex: /Learn more/ },
  { label: "Low-contrast Tailwind classes", regex: /text-blue-300|text-blue-400|opacity-25|opacity-50/ },
  { label: "Unused preconnect to fonts.gstatic.com", regex: /fonts\.gstatic\.com/ },
  { label: "Deep nested LCP structure", regex: /object-cover opacity-25/ }
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  patterns.forEach(({ label, regex }) => {
    lines.forEach((line, index) => {
      if (regex.test(line)) {
        console.log(`\n📌 ${label}`);
        console.log(`File: ${filePath}`);
        console.log(`Line: ${index + 1}`);
        console.log(`Match: ${line.trim()}`);
        console.log("-----------------------------------");
      }
    });
  });
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(js|jsx|tsx|html)$/.test(file)) {
      scanFile(fullPath);
    }
  });
}

console.log("🔍 Syncline Lighthouse Issue Scanner");
console.log("Scanning:", projectDir);
console.log("-----------------------------------\n");

scanDir(projectDir);

console.log("\n✅ Scan complete.");
