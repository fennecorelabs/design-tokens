/**
 * @fennecorelabs/design-tokens — Tailwind 4 Preset
 *
 * Maps CSS custom properties to Tailwind utility classes.
 * Usage in tailwind.config.ts:
 *   import { adaptivePreset } from '@fennecorelabs/design-tokens/tailwind/preset'
 *   export default { presets: [adaptivePreset] }
 */

import type { Config } from "tailwindcss";

export const adaptivePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },
        paper: "var(--paper)",
        cloud: "var(--cloud)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        stone: "var(--stone)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
          muted: "var(--accent-muted)",
        },
        cta: {
          DEFAULT: "var(--cta-bg)",
          hover: "var(--cta-hover)",
        },
        category: {
          amber: {
            DEFAULT: "var(--category-amber)",
            border: "var(--category-amber-border)",
            foreground: "var(--category-amber-foreground)",
            muted: "var(--category-amber-muted)",
            subtle: "var(--category-amber-subtle)",
          },
          aqua: {
            DEFAULT: "var(--category-aqua)",
            border: "var(--category-aqua-border)",
            foreground: "var(--category-aqua-foreground)",
            muted: "var(--category-aqua-muted)",
            subtle: "var(--category-aqua-subtle)",
          },
          berry: {
            DEFAULT: "var(--category-berry)",
            border: "var(--category-berry-border)",
            foreground: "var(--category-berry-foreground)",
            muted: "var(--category-berry-muted)",
            subtle: "var(--category-berry-subtle)",
          },
          coral: {
            DEFAULT: "var(--category-coral)",
            border: "var(--category-coral-border)",
            foreground: "var(--category-coral-foreground)",
            muted: "var(--category-coral-muted)",
            subtle: "var(--category-coral-subtle)",
          },
          indigo: {
            DEFAULT: "var(--category-indigo)",
            border: "var(--category-indigo-border)",
            foreground: "var(--category-indigo-foreground)",
            muted: "var(--category-indigo-muted)",
            subtle: "var(--category-indigo-subtle)",
          },
          mint: {
            DEFAULT: "var(--category-mint)",
            border: "var(--category-mint-border)",
            foreground: "var(--category-mint-foreground)",
            muted: "var(--category-mint-muted)",
            subtle: "var(--category-mint-subtle)",
          },
        },
        status: {
          active: {
            DEFAULT: "var(--status-active)",
            border: "var(--status-active-border)",
            foreground: "var(--status-active-foreground)",
            muted: "var(--status-active-muted)",
            subtle: "var(--status-active-subtle)",
          },
          attention: {
            DEFAULT: "var(--status-attention)",
            border: "var(--status-attention-border)",
            foreground: "var(--status-attention-foreground)",
            muted: "var(--status-attention-muted)",
            subtle: "var(--status-attention-subtle)",
          },
          cancelled: {
            DEFAULT: "var(--status-cancelled)",
            border: "var(--status-cancelled-border)",
            foreground: "var(--status-cancelled-foreground)",
            muted: "var(--status-cancelled-muted)",
            subtle: "var(--status-cancelled-subtle)",
          },
          claimed: {
            DEFAULT: "var(--status-claimed)",
            border: "var(--status-claimed-border)",
            foreground: "var(--status-claimed-foreground)",
            muted: "var(--status-claimed-muted)",
            subtle: "var(--status-claimed-subtle)",
          },
          completed: {
            DEFAULT: "var(--status-completed)",
            border: "var(--status-completed-border)",
            foreground: "var(--status-completed-foreground)",
            muted: "var(--status-completed-muted)",
            subtle: "var(--status-completed-subtle)",
          },
          confirmed: {
            DEFAULT: "var(--status-confirmed)",
            border: "var(--status-confirmed-border)",
            foreground: "var(--status-confirmed-foreground)",
            muted: "var(--status-confirmed-muted)",
            subtle: "var(--status-confirmed-subtle)",
          },
          danger: {
            DEFAULT: "var(--status-danger)",
            border: "var(--status-danger-border)",
            foreground: "var(--status-danger-foreground)",
            muted: "var(--status-danger-muted)",
            subtle: "var(--status-danger-subtle)",
          },
          draft: {
            DEFAULT: "var(--status-draft)",
            border: "var(--status-draft-border)",
            foreground: "var(--status-draft-foreground)",
            muted: "var(--status-draft-muted)",
            subtle: "var(--status-draft-subtle)",
          },
          expired: {
            DEFAULT: "var(--status-expired)",
            border: "var(--status-expired-border)",
            foreground: "var(--status-expired-foreground)",
            muted: "var(--status-expired-muted)",
            subtle: "var(--status-expired-subtle)",
          },
          info: {
            DEFAULT: "var(--status-info)",
            border: "var(--status-info-border)",
            foreground: "var(--status-info-foreground)",
            muted: "var(--status-info-muted)",
            subtle: "var(--status-info-subtle)",
          },
          open: {
            DEFAULT: "var(--status-open)",
            border: "var(--status-open-border)",
            foreground: "var(--status-open-foreground)",
            muted: "var(--status-open-muted)",
            subtle: "var(--status-open-subtle)",
          },
          pending: {
            DEFAULT: "var(--status-pending)",
            border: "var(--status-pending-border)",
            foreground: "var(--status-pending-foreground)",
            muted: "var(--status-pending-muted)",
            subtle: "var(--status-pending-subtle)",
          },
          success: {
            DEFAULT: "var(--status-success)",
            border: "var(--status-success-border)",
            foreground: "var(--status-success-foreground)",
            muted: "var(--status-success-muted)",
            subtle: "var(--status-success-subtle)",
          },
          warning: {
            DEFAULT: "var(--status-warning)",
            border: "var(--status-warning-border)",
            foreground: "var(--status-warning-foreground)",
            muted: "var(--status-warning-muted)",
            subtle: "var(--status-warning-subtle)",
          },
        },
        surface: {
          "2": "var(--surface-2)",
          "3": "var(--surface-3)",
          active: "var(--surface-active)",
          elevated: "var(--surface-elevated)",
          floating: "var(--surface-floating)",
          hover: "var(--surface-hover)",
          raised: {
            DEFAULT: "var(--surface-raised)",
            border: "var(--surface-raised-border)",
          },
          selected: "var(--surface-selected)",
          sunken: "var(--surface-sunken)",
          tinted: "var(--surface-tinted)",
          "tinted-border": "var(--surface-tinted-border)",
        },
        "border-strong": "var(--border-strong)",
        "text-tertiary": "var(--text-tertiary)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        organic: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        "soft-sm": "var(--shadow-sm)",
        "soft-md": "var(--shadow-md)",
        "soft-lg": "var(--shadow-lg)",
        "soft-xl": "var(--shadow-xl)",
        "accent-sm": "var(--shadow-accent-sm)",
        "accent-md": "var(--shadow-accent-md)",
      },
      maxWidth: {
        content: "var(--max-w)",
      },
      spacing: {
        section: "var(--pad-section)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out)",
        spring: "var(--ease-spring)",
      },
      zIndex: {
        nav: "var(--z-nav)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
        picker: "var(--z-picker)",
      },
    },
  },
};

export default adaptivePreset;
