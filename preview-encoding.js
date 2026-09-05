// preview-encoding.js
// Run this script from your project root using Node.js: node preview-encoding.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.join(__dirname, 'src');

const ARTIFACTS = [
  { regex: /â€”/g, label: 'Em-dash artifact (â€”)', replacement: '&mdash;' },
  { regex: /â€“/g, label: 'En-dash artifact (â€“)', replacement: '&ndash;' },
  { regex: /â€™/g, label: 'Apostrophe artifact (â€™)', replacement: "'" },
  { regex: /â€œ/g, label: 'Left quote artifact (â€œ)', replacement: '&ldquo;' },
  { regex: /â€/g, label: 'Right quote artifact (â€)', replacement: '&rdquo;' },
];

let totalMatchesFound = 0;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  let filePrintedHeader = false;

  lines.forEach((line, lineIndex) => {
    ARTIFACTS.forEach(({ regex, label, replacement }) => {
      regex.lastIndex = 0;
      if (regex.test(line)) {
        if (!filePrintedHeader) {
          console.log(`\n📄 File: ${path.relative(__dirname, filePath)}`);
          filePrintedHeader = true;
        }
        
        const previewLine = line.replace(regex, `\x1b[32m[${replacement}]\x1b[0m`);
        console.log(`  Line ${lineIndex + 1} [${label}]:`);
        console.log(`    Current: ${line.trim()}`);
        console.log(`    Preview: ${previewLine.trim()}`);
        totalMatchesFound++;
      }
    });
  });
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        walkDir(fullPath);
      }
    } else if (stat.isFile()) {
      if (/\.(js|jsx|ts|tsx|html|css|md)$/i.test(file)) {
        scanFile(fullPath);
      }
    }
  });
}

console.log('🔍 Scanning codebase to preview encoding replacements...');
if (fs.existsSync(TARGET_DIR)) {
  walkDir(TARGET_DIR);
  console.log('\n----------------------------------------');
  if (totalMatchesFound === 0) {
    console.log('✅ No encoding artifacts detected.');
  } else {
    console.log(`⚠️ Found ${totalMatchesFound} instance(s) across your files that will be replaced.`);
  }
} else {
  console.log(`Target directory not found: ${TARGET_DIR}`);
}