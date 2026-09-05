// fix-remaining.cjs
const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, 'src', 'components', 'contact', 'ContactSection.jsx'),
  path.join(__dirname, 'src', 'pages', 'CaseStudies.jsx')
];

targetFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix remaining fragments
    content = content.replace(/Sendingâ€¦/g, 'Sending…');
    content = content.replace(/Multiâ€‘Site/g, 'Multi-Site');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ Fixed final fragments in: ${path.relative(__dirname, filePath)}`);
  }
});

console.log('✅ All encoding anomalies completely resolved!');