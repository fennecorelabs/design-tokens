import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const css = read('../css/lenzaba-ui.css');
const palette = JSON.parse(read('../src/lenzaba-palette.json'));
const ui = JSON.parse(read('../src/lenzaba-ui.json'));
const root = '[data-product="lenzaba"][data-ui="reference-v1"]';
const declarationSource = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@import[^;]+;/g, '');
const rules = [...declarationSource.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim(),
  roles: Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value])),
}));
const rule = selector => {
  const found = rules.find(entry => entry.selector === selector);
  assert.ok(found, `Missing rule: ${selector}`);
  return found.roles;
};

// Decode emitted full-color OKLCH values so tests verify generated colors,
// rather than checking only the source snapshot or a declaration's presence.
const rgb = value => {
  const match = value.match(/^oklch\((\S+) (\S+) (\S+)\)$/);
  assert.ok(match, value);
  const [, l, c, h] = match.map(Number);
  const a = c * Math.cos(h * Math.PI / 180);
  const b = c * Math.sin(h * Math.PI / 180);
  const lm = (l + .3963377774 * a + .2158037573 * b) ** 3;
  const mm = (l - .1055613458 * a - .0638541728 * b) ** 3;
  const sm = (l - .0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * lm - 3.3077115913 * mm + .2309699292 * sm,
    -1.2684380046 * lm + 2.6097574011 * mm - .3413193965 * sm,
    -.0041960863 * lm - .7034186147 * mm + 1.707614701 * sm]
    .map(v => Math.round(255 * (v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055)));
};
const hex = value => `#${rgb(value).map(v => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
const luminance = value => rgb(value).map(v => v / 255)
  .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

test('the opt-in CSS export resolves and reuses the existing local font adapter', () => {
  assert.equal(require.resolve('@fennecorelabs/design-tokens/css/lenzaba-ui'), new URL('../css/lenzaba-ui.css', import.meta.url).pathname);
  assert.deepEqual([...css.matchAll(/@import\s+"([^"]+)"/g)].map(([, path]) => path), ['./lenzaba-brand.css']);
  assert.doesNotMatch(css, /@font-face|https?:|!important/);
});

for (const mode of ['light', 'dark']) {
  test(`${mode}: generated surfaces, paired statuses, fonts and essential boundaries match the contract`, () => {
    const roots = mode === 'light' ? [root] : [`${root}.dark`, `.dark ${root}`];
    const roles = rule([...roots, ...roots.map(selector => `${selector} [data-theme="cold-purple"]`)].join(',\n'));
    const colors = { ...palette.themes[mode], ...ui.themes[mode] };
    for (const [key, value] of Object.entries(colors)) {
      const name = key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
      assert.equal(hex(roles[`lenzaba-${name}`]), value, key);
    }
    for (const [name, color] of Object.entries({ background: 'background', card: 'surface', popover: 'surface', surface: 'surface', 'surface-raised': 'raised', input: 'control-border', 'control-border': 'control-border', destructive: 'error', 'destructive-foreground': 'on-error' })) {
      assert.equal(roles[name], `var(--lenzaba-${color})`, name);
    }
    assert.equal(hex(roles['lenzaba-control-border']), mode === 'light' ? '#85718F' : '#A48BB8');
    for (const surface of ['background', 'surface', 'raised']) {
      assert.ok(contrast(roles['lenzaba-control-border'], roles[`lenzaba-${surface}`]) >= 3, surface);
    }
    for (const [family, color] of Object.entries({ success: 'success', warning: 'warning', error: 'error', danger: 'error', info: 'info', attention: 'warning' })) {
      assert.equal(roles[`status-${family}-foreground`], `var(--lenzaba-${color})`);
      for (const suffix of ['surface', 'subtle', 'muted']) assert.equal(roles[`status-${family}-${suffix}`], `var(--lenzaba-${color}-surface)`);
      assert.ok(contrast(roles[`lenzaba-${color}`], roles[`lenzaba-${color}-surface`]) >= 4.5, family);
    }
    assert.ok(contrast(roles['lenzaba-error'], roles['lenzaba-on-error']) >= 4.5);
    assert.equal(roles['font-sans'], 'var(--font-lenzaba-body)');
    assert.equal(roles['font-display'], 'var(--font-lenzaba-display)');
  });
}

test('every adapter declaration requires the reference opt-in; no control dimensions are forced', () => {
  for (const { selector, roles } of rules) {
    for (const branch of selector.split(',\n')) assert.ok(branch.includes(root), branch);
    assert.ok(Object.keys(roles).length > 0, selector);
    assert.doesNotMatch(selector, /\*|data-slot|\bbutton\b|\binput\b/);
  }
  assert.doesNotMatch(css, /(?:^|\n)\s*(?:height|min-height|width|border-radius|font-family)\s*:/);
  assert.doesNotMatch(css, /:root\s*\{|@theme|color-scheme/);
});

test('root and nested density/readable settings override zero-specificity defaults', () => {
  const defaults = rule(`:where(${root})`);
  assert.equal(defaults['ui-control-height'], '44px');
  assert.equal(defaults['ui-control-font-size'], '14px');
  for (const [name, px] of Object.entries({ control: 8, card: 12, dialog: 16 })) assert.equal(defaults[`ui-radius-${name}`], `${px}px`);
  for (const [density, px] of Object.entries({ comfortable: 44, compact: 32 })) {
    const selector = `:where(${root})[data-density="${density}"],\n:where(${root}) [data-density="${density}"]`;
    assert.equal(rule(selector)['ui-control-height'], `${px}px`);
  }
  const readable = rules.find(({ selector }) => selector.startsWith(`:where(${root})[data-readable="true"]`));
  assert.ok(readable.selector.includes(`:where(${root}[data-readable="true"], ${root} [data-readable="true"]) [data-density]`));
  assert.equal(readable.roles['ui-control-height'], '44px');
  assert.equal(readable.roles['ui-control-font-size'], '16px');
  assert.ok(css.indexOf('[data-readable="true"]') > css.indexOf('[data-density="compact"]'));
  assert.match(css, /@media \(any-pointer: coarse\) \{[\s\S]*--ui-control-height: 44px;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*--ui-feedback-duration: 0ms;/);
});
