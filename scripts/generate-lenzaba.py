"""Generate the opt-in LenzABA CSS from the owner-selected palette snapshot."""
import json, math, re, sys
from pathlib import Path
pkg = Path(__file__).resolve().parents[1]
data = json.loads((pkg / 'src/lenzaba-palette.json').read_text())
assert data['selection'] == '03'
# Preserve the package's complete-color OKLCH contract, with unrounded source
# hex values retained alongside the generated CSS for reproducible verification.
def oklch(value):
    rgb = [int(value[i:i+2],16)/255 for i in (1,3,5)]
    r,g,b = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    l,m,s = [(a*r+c*g+d*b)**(1/3) for a,c,d in ((.4122214708,.5363325363,.0514459929),(.2119034982,.6806995451,.1073969566),(.0883024619,.2817188376,.6299787005))]
    L = .2104542553*l+.793617785*m-.0040720468*s
    a = 1.9779984951*l-2.428592205*m+.4505937099*s
    b = .0259040371*l+.7827717662*m-.808675766*s
    C = math.hypot(a,b)
    h = math.degrees(math.atan2(b,a))%360 if C>1e-7 else 0
    return f'oklch({L:.9f} {C:.9f} {h:.7f})'

snapshot = data

# App-shell owns ordinary panel surfaces and dividers. Reuse its declarations
# instead of turning the selected brand swatches into page-wide decoration.
def declarations(path, selector):
    source = (pkg / path).read_text()
    match = re.search(r'^' + re.escape(selector) + r' \{(.*?)^\}', source, re.M | re.S)
    assert match, f'Missing {selector} in {path}'
    return dict(re.findall(r'--([\w-]+):\s*([^;]+);', match.group(1)))

shell_light = declarations('css/app-shell.css', ':root')
shell_dark = shell_light | declarations('css/app-shell.css', '.dark')
neutral_theme = declarations('css/themes.css', ':root')
flat_roles = (
    'background', 'card', 'popover', 'muted', 'border',
    'sidebar', 'sidebar-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border',
    'surface-raised', 'surface-elevated', 'surface-2', 'surface-3',
    'surface-floating', 'surface-sunken', 'surface-hover',
    'surface-active', 'surface-selected', 'surface-tinted',
    'surface-raised-border', 'surface-tinted-border',
)

css = ['/* LenzABA direction 03. Opt-in only; import after app-shell.\n * Source: src/lenzaba-palette.json. Full OKLCH colors, never bare channels.\n * .dark remains owned by each app theme provider. No storage or JS changes.\n */', '@theme inline {\n  --color-chart-6: var(--chart-6);\n  --color-control-border: var(--control-border);\n  --color-destructive-foreground: var(--destructive-foreground);\n}']
for mode in ('light','dark'):
    t=snapshot['themes'][mode]
    scope='[data-product="lenzaba"]' if mode=='light' else '[data-product="lenzaba"].dark'
    # Rebind inherited aliases on the marketing scope; CSS custom property
    # references resolve where declared, not where descendants consume them.
    selectors=f'{scope},\n{scope} [data-theme="cold-purple"]'
    roles={f'lenzaba-{re.sub(r"(?<!^)(?=[A-Z])", "-",k).lower()}': oklch(v) for k,v in t.items()}
    roles |= {f'brand-{k}':oklch(v) for k,v in snapshot['scales']['purple'].items()}
    roles |= {'swatch': '#9B6DD7', 'brand-swatch': '#9B6DD7'}
    aliases={
      'foreground':'text','card-foreground':'text','popover-foreground':'text',
      'primary':'action','primary-foreground':'on-action',
      'secondary':'secondary','secondary-foreground':'on-secondary','muted-foreground':'muted',
      'accent':'accent-surface','accent-foreground':'accent','ring':'focus',
      'paper':'background','cloud':'raised','ink':'text','ink-muted':'muted','stone':'muted',
      'text-tertiary':'muted',
      'sidebar-primary':'action','sidebar-primary-foreground':'on-action',
      'sidebar-ring':'focus',
      'destructive':'error','destructive-foreground':'error-surface',
      'contrast-foreground':'on-action',
    }
    roles |= {k:f'var(--lenzaba-{v})' for k,v in aliases.items()}
    # Resolve light shell paper/cloud references before the product's marketing
    # aliases are rebound. Keep helper formulas tied to semantic primary/text.
    shell = shell_light if mode == 'light' else shell_dark
    for role in flat_roles:
        value = shell[role]
        for neutral in ('paper', 'cloud'):
            value = value.replace(f'var(--{neutral})', neutral_theme[neutral])
        roles[role] = value
    roles['sidebar-muted'] = 'var(--sidebar-foreground-muted)'
    # Palette muted foreground provides a >=3:1 control
    # boundary against background, surface, and raised surfaces in both modes.
    roles |= {'control-border':'var(--lenzaba-muted)','input':'var(--control-border)','border-strong':'var(--control-border)'}
    for i,(name,value) in enumerate(snapshot['chartPalettes'][mode].items(),1):
        roles[f'chart-{i}']=oklch(value)
        roles[f'chart-{name}']=f'var(--chart-{i})'
    for family,role in {'info':'info','success':'success','warning':'warning','danger':'error','attention':'warning'}.items():
        for suffix,value in {'':role,'-foreground':role,'-subtle':role+'-surface','-muted':role+'-surface','-border':role}.items():
            roles['status-'+family+suffix]=f'var(--lenzaba-{value})'
    for family,chart in {'aqua':'teal','amber':'amber','indigo':'purple','berry':'rose','mint':'olive','coral':'blue'}.items():
        roles['category-'+family]=f'var(--chart-{chart})'
        roles['category-'+family+'-foreground']=f'color-mix(in oklch, var(--chart-{chart}) 72%, var(--foreground) 28%)'
        roles['category-'+family+'-border']=f'var(--chart-{chart})'
        for suffix,pct in [('-subtle',10),('-muted',18)]:
            roles['category-'+family+suffix]=f'color-mix(in oklch, var(--chart-{chart}) {pct}%, var(--background))'
    css.append(selectors+' {\n'+''.join(f'  --{k}: {v};\n' for k,v in roles.items())+'}')
css.append('''/* Controls must not rely on the decorative divider token. Keep transparent
 * outline actions visible and retain existing error and keyboard states. */
[data-product="lenzaba"] :is([data-slot="input"], [data-slot="textarea"], [data-slot="select-trigger"], [data-slot="checkbox"], [data-slot="radio-group-item"], [data-variant="outline"]) {
  border-color: var(--control-border);
}
[data-product="lenzaba"] :is(button, a, input, textarea, select, [role="combobox"], [role="checkbox"], [role="radio"], [tabindex]):focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}
[data-product="lenzaba"] [aria-invalid="true"] {
  border-color: var(--destructive);
}
''')
outputs = {'lenzaba.css': '\n\n'.join(css)}
marketing='''/* Thin adapter for the existing marketing foreground-accent contract.
 * Import after marketing tokens; alternative palette choices keep their rules. */
[data-product="lenzaba"] [data-theme="cold-purple"],
[data-product="lenzaba"].dark [data-theme="cold-purple"] {
  --marketing-brand-text: var(--primary);
  --accent: var(--lenzaba-accent);
  --accent-hover: var(--lenzaba-accent);
  --accent-subtle: var(--lenzaba-accent-surface);
  --accent-muted: var(--lenzaba-accent-surface);
  --cta-bg: var(--primary);
  --cta-hover: var(--primary);
  --hero-bg: var(--cloud);
  --hero-text: var(--ink);
}
'''
outputs['lenzaba-marketing.css'] = marketing
for name, content in outputs.items():
    path = pkg / 'css' / name
    if '--check' in sys.argv:
        assert path.read_text() == content, f'{name} is stale; run npm run generate:lenzaba'
    else:
        path.write_text(content)
print('LenzABA generated CSS matches selected source.' if '--check' in sys.argv else 'Generated LenzABA CSS.')
