import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = path => readFileSync(new URL(path, import.meta.url), "utf8");
const palette = JSON.parse(read("../src/lenzaba-palette.json"));
const css = read("../css/lenzaba.css");
const manifest = JSON.parse(read("../package.json"));
const luminance = hex => hex.slice(1).match(/../g).map(n => parseInt(n, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((s, c, i) => s + c * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
test("package exports resolve and ship in files", () => {
  for (const name of ["lenzaba", "lenzaba-marketing"]) {
    const target = manifest.exports[`./css/${name}`];
    assert.equal(target, `./css/${name}.css`);
    assert.ok(existsSync(new URL(`../${target}`, import.meta.url)));
  }
  assert.ok(manifest.files.includes("css/"));
});
test("selected action and brand swatches remain separate", () => {
  assert.equal(palette.selection, "03");
  assert.equal(palette.sourceBrandPurple, "#9B6DD7");
  assert.equal(palette.themes.light.action, "#684096");
  assert.equal(palette.themes.dark.action, "#C5A1ED");
});
for (const [mode, t] of Object.entries(palette.themes)) {
  test(`${mode}: role pairs, control boundaries, focus, and all chart roles`, () => {
    for (const [fg, bg] of [[t.text,t.background],[t.text,t.surface],[t.muted,t.raised],[t.onAction,t.action],[t.onSecondary,t.secondary],[t.accent,t.accentSurface], ...["success","warning","error","info"].map(s => [t[s], t[`${s}Surface`]])]) assert.ok(contrast(fg,bg) >= 4.5, `${fg}/${bg}`);
    for (const surface of [t.background,t.surface,t.raised]) {
      assert.ok(contrast(t.muted,surface)>=3, `control boundary on ${surface}`);
      assert.ok(contrast(t.focus,surface)>=3, `focus on ${surface}`);
      for (const color of Object.values(palette.chartPalettes[mode])) assert.ok(contrast(color,surface)>=3, `chart ${color} on ${surface}`);
    }
    for (const key of Object.keys(t)) {
      const cssName=key.replace(/[A-Z]/g, c=>`-${c.toLowerCase()}`);
      assert.ok(css.includes(`--lenzaba-${cssName}: oklch(`), cssName);
    }
  });
}
test("product opt-in owns declarations; shared defaults are not imported or replaced", () => {
  assert.ok(!css.includes(":root {"));
  assert.ok(!css.includes('@import'));
  assert.ok(css.includes('[data-product="lenzaba"].dark'));
  assert.ok(css.includes('--input: var(--control-border)'));
  assert.ok(css.includes('--chart-6: oklch('));
});
