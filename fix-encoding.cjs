// fix-encoding.cjs
// Run this script from your project root using Node.js: node fix-encoding.cjs

const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src');

const REPLACEMENTS = [
  { bad: /â€”/g, good: '—' },       // Clean standard em-dash
  { bad: /â€“/g, good: '–' },       // Clean standard en-dash
  { bad: /â€™/g, good: "'" },       // Clean apostrophe
  { bad: /â€œ/g, good: '"' },       // Clean left double quote
  { bad: /â€\x9d/g, good: '"' },    // Clean right double quote artifact pair
  { bad: /â€\x80/g, good: '-' },    // Specific dash trailing fragment
];

let totalFilesModified = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  REPLACEMENTS.forEach(({ bad, good }) => {
    if (bad.test(content)) {
      content = content.replace(bad, good);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ Cleaned encoding in: ${path.relative(__dirname, filePath)}`);
    totalFilesModified++;
  }
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
        processFile(fullPath);
      }
    }
  });
}

console.log('🧹 Applying clean character fixes to source files...');
if (fs.existsSync(TARGET_DIR)) {
  walkDir(TARGET_DIR);
  console.log('\n----------------------------------------');
  console.log(`✅ Cleanup complete! Updated ${totalFilesModified} file(s).`);
} else {
  console.log(`Target directory not found: ${TARGET_DIR}`);
}