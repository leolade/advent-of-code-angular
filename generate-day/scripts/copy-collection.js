const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src', 'collection.json');
const srcSchema = path.join(root, 'src', 'generate-day', 'schema.json');
const destDir = path.join(root, 'dist');
const destDirSchema = path.join(root, 'dist', 'generate-day');
const dest = path.join(destDir, 'collection.json');
const destSchema = path.join(destDirSchema, 'schema.json');

if (!fs.existsSync(src)) {
  console.error(`Source collection.json introuvable: ${src}`);
  process.exit(1);
}

if (!fs.existsSync(srcSchema)) {
  console.error(`Source schema.json introuvable: ${srcSchema}`);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(destDirSchema)) {
  fs.mkdirSync(destDirSchema, { recursive: true });
}

const content = fs.readFileSync(src);
const contentSchema = fs.readFileSync(srcSchema);
fs.writeFileSync(dest, content);
fs.writeFileSync(destSchema, contentSchema);
console.log(`Copied ${src} -> ${dest}`);
console.log(`Copied ${srcSchema} -> ${destSchema}`);
