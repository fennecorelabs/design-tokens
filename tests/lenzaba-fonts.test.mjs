import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const prefix = '@fennecorelabs/design-tokens/brand/lenzaba/fonts/room-to-grow-v1/';

test('self-hosted font URLs resolve to licensed, unmodified distributable files', () => {
  const cssPath = require.resolve('@fennecorelabs/design-tokens/css/lenzaba-brand');
  const css = readFileSync(cssPath, 'utf8');
  const manifest = JSON.parse(readFileSync(require.resolve(`${prefix}manifest.json`), 'utf8'));
  for (const [file, hash] of Object.entries(manifest.files)) {
    const data = readFileSync(require.resolve(`${prefix}${file}`));
    assert.equal(createHash('sha256').update(data).digest('hex'), hash, file);
    if (file.endsWith('-OFL.txt')) assert.match(data.toString(), /SIL OPEN FONT LICENSE Version 1\.1/);
  }
  const urls = [...css.matchAll(/url\('([^']+)'\)/g)];
  assert.equal(urls.length, 2);
  for (const [, url] of urls) {
    const data = readFileSync(new URL(url, `file://${cssPath}`));
    assert.equal(data.readUInt32BE(0), 0x00010000, 'TrueType font signature');
  }
  assert.equal((css.match(/font-display: swap/g) || []).length, 2);
  assert.doesNotMatch(css, /https?:|@import|color-scheme|!important/);
  assert.match(css, /\[data-product="lenzaba"\]/);
});
