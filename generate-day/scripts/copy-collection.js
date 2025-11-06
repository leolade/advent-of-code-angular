const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src', 'collection.json');
const destDir = path.join(root, 'dist');
const dest = path.join(destDir, 'collection.json');

if (!fs.existsSync(src)) {
  console.error(`Source collection.json introuvable: ${src}`);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const content = fs.readFileSync(src);
fs.writeFileSync(dest, content);
console.log(`Copied ${src} -> ${dest}`);

