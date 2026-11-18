# FitLife Frontend

A single-page UI sketch built with React, TypeScript, Vite, Tailwind CSS v4, and TailAdmin components. The interface uses the **Modern** palette, **Be Vietnam Pro**, and a light theme.

## Run and check

Run these commands from the repository root:

```sh
npm install
npm run dev:client
npm run build -w client
npm run lint -w client
npm run preview -w client
```

This project uses npm workspaces. Use the root `package-lock.json` for dependency installation.

## Frontend structure

```text
src/
├── components/
│   ├── layout/       # Header, vertical sidebar, role and profile dropdowns
│   ├── shared/       # FitLife logo and demo section container
│   └── ui/           # Reusable TailAdmin primitives and their dependencies
├── hooks/            # Mobile breakpoint detection
├── icons/            # SVG components used by the sketch
├── layouts/          # MainLayout: sidebar, header, and content
├── pages/            # Dashboard: color and button samples
├── utils/            # Tailwind class merging
├── App.tsx           # Renders the sketch inside MainLayout
├── main.tsx          # React entry point
└── index.css         # TailAdmin styles, font imports, and theme tokens
```

## Modern palette

Color tokens are defined in the `@theme` block of [src/index.css](./src/index.css).

| Purpose | Hex | CSS token | Tailwind classes |
|---|---|---|---|
| Primary actions, branding, active navigation | `#465FFF` | `--color-brand-500` | `bg-brand-500`, `text-brand-500` |
| Primary hover state | `#3641F5` | `--color-brand-600` | `hover:bg-brand-600` |
| Soft accent background | `#EEF2FF` | `--color-brand-50` | `bg-brand-50` |
| Page background | `#F9FAFB` | `--color-gray-50` | `bg-gray-50` |
| Cards, header, sidebar | `#FFFFFF` | `--color-white` | `bg-white` |
| Primary text and headings | `#1D2939` | `--color-gray-800` | `text-gray-800` |

Use `text-gray-500` for secondary text and `border-gray-200` for borders. The remaining brand shades follow TailAdmin. Green, red, and amber indicate success, errors/destructive actions, and warnings respectively.

Prefer component variants and token-based classes over hardcoded hex values in JSX. Update the theme tokens and this table together when changing the palette.

## Reusing components

Use the existing TailAdmin components and variants to keep the interface consistent:

```tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

<Button>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Badge color="primary" variant="light">Selected</Badge>
```

Keep the template's component styling. Typography uses locally bundled Be Vietnam Pro weights 400, 500, 600, and 700 via `@fontsource/be-vietnam-pro`. The font token is `--font-be-vietnam-pro`.

The shared logo is [FitLifeIcon.tsx](./src/components/shared/FitLifeIcon.tsx), using the supplied dumbbell SVG and TailAdmin's default icon-button variants. The favicon is [fitlife-icon.svg](./public/images/logo/fitlife-icon.svg); its primary color is stored separately as `#465FFF`.

## Sketch behavior

- The sidebar can collapse on desktop and opens as a drawer on mobile.
- The header follows TailAdmin's original responsive layout. The three-dot button reveals the account controls on mobile.
- The search shortcut is Ctrl+K or Cmd+K. Search input is a visual placeholder without a search backend.
- The role button switches between Member, Trainer, and Staff, displayed as Vietnamese labels. Every role shows the same sketch page; this is not an authentication or authorization system.
- The separate round avatar opens sample profile information and shows the current role.
- Dashboard buttons are visual samples without business actions. Dark-mode switching and multilingual support have been removed.

## Template source and license

TailAdmin Free React Dashboard **2.5.1**, based on commit `486ed748b21e032a4432effeca4ef3684fa223d3` from the [official repository](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard).

The integration keeps the template's component styles, with FitLife branding, the Modern color tokens, Be Vietnam Pro, and a reduced demo layout. Icons are imported directly. Scoped ESLint exceptions preserve upstream shared exports and mobile synchronization effects.

Retain [TAILADMIN-LICENSE.md](./TAILADMIN-LICENSE.md) when distributing the TailAdmin-derived code.
