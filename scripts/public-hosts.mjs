import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Public output must not name hosts that customers cannot use. An internal Cloud Run host
// (`*.run.app`), a retired domain (`portpowered.com`) or a stray TLD (`*.lol`) in an example is
// copied into SDKs and agent prompts, so generation fails instead of publishing it.
//
// Allowed hosts, each for a stated reason:
//  - Port OS production: portoperatingsystem.com and its subdomains.
//  - Obvious placeholders: example.com/.org/.net, *.example, *.test, *.invalid, localhost and
//    loopback addresses.
//  - Standards that descriptions and schemas link to.
//  - Third-party providers whose public documentation, endpoints or tool downloads (github.com for the
//    SmartThings CLI releases) a capability or guide names.
const productionSuffixes = ['portoperatingsystem.com'];
const placeholderSuffixes = ['example.com', 'example.org', 'example.net', 'example', 'test', 'invalid', 'localhost'];
const loopback = new Set(['127.0.0.1', '0.0.0.0', '::1', '[::1]']);
const standards = new Set(['json-schema.org', 'datatracker.ietf.org', 'www.rfc-editor.org', 'spec.openapis.org']);
const providers = new Set([
  'developer.spotify.com',
  'console.cloud.google.com',
  'console.nest.google.com',
  'developer.smartthings.com',
  'github.com',
  'api.sonos.com',
  'apigw.iotbing.com',
  'www.amazon.com',
]);

const urlHost = /\b[a-z][a-z0-9+.-]*:\/\/(?:[^\s/?#@"'<>()\\]*@)?(\[[0-9a-f:]+\]|[a-z0-9._-]+)/gi;
const suffixOf = (host, suffix) => host === suffix || host.endsWith(`.${suffix}`);

export function isAllowedHost(host) {
  const name = host.toLowerCase().replace(/\.+$/, '');
  return loopback.has(name)
    || standards.has(name)
    || providers.has(name)
    || [...productionSuffixes, ...placeholderSuffixes].some(suffix => suffixOf(name, suffix));
}

// Returns the sorted, de-duplicated hosts in `text` that are not allowed. Only hosts of
// scheme://host URLs are considered, so version numbers and file names never match.
export function disallowedHosts(text) {
  const found = new Set();
  for (const match of text.matchAll(urlHost)) {
    const host = match[1];
    if (/^[a-z][a-z0-9+.-]*$/i.test(host) && !host.includes('.') && !['localhost'].includes(host.toLowerCase())) continue;
    if (!isAllowedHost(host)) found.add(host.replace(/\.+$/, ''));
  }
  return [...found].sort();
}

// Source contracts that reach customers without passing through generated output (the MCP
// catalog and event protocol schemas under `api/mcp`) obey the same host rule. Returns
// `path: host` entries, relative to `directory`, for every file naming a disallowed host.
export function disallowedHostsInTree(directory) {
  const found = [];
  const visit = current => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const filename = path.join(current, entry.name);
      if (entry.isDirectory()) visit(filename);
      else for (const host of disallowedHosts(readFileSync(filename, 'utf8'))) {
        found.push(`${path.relative(directory, filename).replaceAll('\\', '/')}: ${host}`);
      }
    }
  };
  visit(directory);
  return found.sort();
}
