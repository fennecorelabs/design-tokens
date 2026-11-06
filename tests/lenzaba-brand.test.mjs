import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = new URL('../brand/lenzaba/soft-focus-r1/', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', root), 'utf8'));

test('the complete accepted artwork resolves through package exports with matching hashes and dimensions', () => {
  assert.equal(manifest.assets.length, 15);
  assert.deepEqual(manifest.selectionIds, ['H1', 'W1', 'R1']);
  const artwork = readdirSync(root).filter(file => /\.(svg|png)$/.test(file)).sort();
  assert.deepEqual(artwork, manifest.assets.map(asset => asset.file).sort());
  for (const asset of manifest.assets) {
    const resolved = require.resolve(`@fennecorelabs/design-tokens/brand/lenzaba/soft-focus-r1/${asset.file}`);
    const data = readFileSync(resolved);
    assert.equal(createHash('sha256').update(data).digest('hex'), asset.sha256, asset.file);
    if (asset.format === 'png') {
      assert.equal(data.toString('hex', 0, 8), '89504e470d0a1a0a');
      assert.equal(data.readUInt32BE(16), asset.width, asset.file);
      assert.equal(data.readUInt32BE(20), asset.height, asset.file);
    } else {
      const svg = data.toString('utf8');
      assert.match(svg, new RegExp(`viewBox="0 0 ${asset.width} ${asset.height}"`));
    }
  }
});

test('the distributable includes the brand directory and manifest export', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.ok(pkg.files.includes('brand/'));
  assert.equal(require.resolve('@fennecorelabs/design-tokens/brand/lenzaba/soft-focus-r1/manifest.json'), new URL('manifest.json', root).pathname);
});
