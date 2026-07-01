import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Build output missing. Run npm run build first.');
  process.exit(1);
}

const filesToCopy = ['manifest.json', 'extension/background.js', 'popup.html', 'popup.js'];

for (const relativePath of filesToCopy) {
  const source = path.join(root, relativePath);
  const destination = path.join(distDir, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

if (fs.existsSync(path.join(root, 'icons'))) {
  fs.cpSync(path.join(root, 'icons'), path.join(distDir, 'icons'), { recursive: true });
}

console.log('Extension assets prepared in dist/');
