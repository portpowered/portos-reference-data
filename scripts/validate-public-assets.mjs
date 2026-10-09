import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../generated/public');
const manifest = JSON.parse(readFileSync(path.join(root, 'docs/references/manifest.json'), 'utf8'));
const listed = new Set(manifest.files.map(entry => entry.path));
for (const entry of manifest.files) {
  const data = readFileSync(path.join(root, entry.path.slice(1)));
  if (data.length !== entry.bytes || createHash('sha256').update(data).digest('hex') !== entry.sha256) throw new Error(`Hash mismatch: ${entry.path}`);
  if (entry.path.endsWith('.md') || entry.path === '/llms.txt') {
    for (const match of data.toString().matchAll(/\]\((\/[^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!listed.has(target) && target !== '/docs/references/manifest.json') throw new Error(`Broken public link: ${entry.path} → ${target}`);
    }
  }
}
function walk(directory) { return readdirSync(directory).flatMap(name => statSync(path.join(directory, name)).isDirectory() ? walk(path.join(directory, name)) : [path.join(directory, name)]); }
for (const filename of walk(root)) {
  const name = '/' + path.relative(root, filename).replaceAll('\\', '/');
  if (name !== '/docs/references/manifest.json' && !listed.has(name)) throw new Error(`Unmanifested public asset: ${name}`);
}
process.stdout.write(`Validated ${manifest.files.length} public files, hashes, and Markdown links.\n`);
