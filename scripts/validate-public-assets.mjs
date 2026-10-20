import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { disallowedHosts } from './public-hosts.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../generated/public');
const manifest = JSON.parse(readFileSync(path.join(root, 'docs/references/manifest.json'), 'utf8'));
const listed = new Set(manifest.files.map(entry => entry.path));
if (!/^[a-f0-9]{40}$/.test(manifest.sourceCommit ?? '')) throw new Error('Missing source provenance');
if (createHash('sha256').update(JSON.stringify(manifest.files)).digest('hex') !== manifest.assetSetSHA256) throw new Error('Asset set hash mismatch');
for (const entry of manifest.files) {
  const data = readFileSync(path.join(root, entry.path.slice(1)));
  if (data.length !== entry.bytes || createHash('sha256').update(data).digest('hex') !== entry.sha256) throw new Error(`Hash mismatch: ${entry.path}`);
  if (entry.aliasOf) {
    const target = manifest.files.find(candidate => candidate.path === entry.aliasOf);
    if (!target || target.aliasOf || target.sha256 !== entry.sha256 || target.contentType !== entry.contentType) throw new Error(`Invalid alias: ${entry.path}`);
  }
  if (entry.path.endsWith('.md') || entry.path === '/llms.txt') {
    for (const match of data.toString().matchAll(/\]\((\/[^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      // llms.txt also points at the website's blog, which is a site route and not a package file.
      const siteRoute = entry.path === '/llms.txt' && target.startsWith('/blog/');
      if (!listed.has(target) && !siteRoute && target !== '/docs/references/manifest.json') throw new Error(`Broken public link: ${entry.path} → ${target}`);
    }
  }
  if (entry.path.endsWith('.json') && !entry.path.endsWith('/index.json')) {
    function validateReferences(node) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach(validateReferences);
      if (typeof node.$ref === 'string' && node.$ref.startsWith('/docs/')) {
        const [pathname, fragment] = node.$ref.split('#');
        if (!listed.has(pathname)) throw new Error(`Broken component reference: ${entry.path} → ${node.$ref}`);
        if (fragment) {
          let target = JSON.parse(readFileSync(path.join(root, pathname.slice(1)), 'utf8'));
          if (!fragment.startsWith('/')) throw new Error(`Unsupported component fragment: ${node.$ref}`);
          for (const token of fragment.slice(1).split('/')) {
            const key = decodeURIComponent(token).replaceAll('~1', '/').replaceAll('~0', '~');
            if (!target || typeof target !== 'object' || !Object.hasOwn(target, key)) throw new Error(`Broken component fragment: ${node.$ref}`);
            target = target[key];
          }
        }
      }
      for (const [key, child] of Object.entries(node)) {
        if (['properties', 'patternProperties', '$defs', 'definitions'].includes(key)) Object.values(child ?? {}).forEach(validateReferences);
        else if (!['example', 'examples', 'default', 'const', 'enum'].includes(key)) validateReferences(child);
      }
    }
    validateReferences(JSON.parse(data.toString()));
  }
}
function walk(directory) { return readdirSync(directory).flatMap(name => statSync(path.join(directory, name)).isDirectory() ? walk(path.join(directory, name)) : [path.join(directory, name)]); }
for (const filename of walk(root)) {
  const name = '/' + path.relative(root, filename).replaceAll('\\', '/');
  if (name !== '/docs/references/manifest.json' && !listed.has(name)) throw new Error(`Unmanifested public asset: ${name}`);
}
// Everything the package ships, not just the public tree, must name only hosts customers can use.
const generatedRoot = path.resolve(root, '..');
const foreign = walk(generatedRoot).flatMap(filename => disallowedHosts(readFileSync(filename, 'utf8'))
  .map(host => `${path.relative(generatedRoot, filename).replaceAll('\\', '/')}: ${host}`));
if (foreign.length) {
  throw new Error(`Public output names hosts outside *.portoperatingsystem.com and the example allowlist (scripts/public-hosts.mjs):\n${foreign.join('\n')}`);
}
process.stdout.write(`Validated ${manifest.files.length} public files, hashes, Markdown links and component references.\n`);
