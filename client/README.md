# FitLife Frontend

A lightweight UI sketch built with React, TypeScript, Vite, Tailwind CSS v4, and TailAdmin components. The interface uses the **Modern** palette, **Be Vietnam Pro**, and a light theme.

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
│   ├── shared/       # Shared tables, dialogs, field displays, and branding
│   └── ui/           # Reusable TailAdmin primitives and their dependencies
├── data/             # Demo member data and Invoice/ServicePlan types
├── hooks/            # Mobile breakpoint detection
├── icons/            # SVG components used by the sketch
├── layouts/          # MainLayout: sidebar, header, and content
├── pages/            # Member screens and page-specific calendar/plan components
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

This iteration is a screen-only prototype, not a functional member portal. The sidebar covers PT scheduling, service plans, invoices, visit/session history, annual loyalty, and profile/card information. Business actions are intentionally disabled; browsing, dialogs, tabs, and calendar navigation work locally.

The schedule uses the original TailAdmin Calendar layout: its toolbar, default month view, view selector, and automatic height. PT event cards alone follow the supplied reference, with a pastel background, colored leading border, title, and secondary time/duration line using existing palette tokens. Booking and read-only details keep the existing dialogs. No custom stylesheet is added.

Invoices and the transaction-history tab reuse TailAdmin Basic Tables / Table Three: the original card, search field, table spacing, status badges, scroll area, and pagination styles. Only FitLife data, labels, document icons, and read-only detail actions are adapted. The date-range button displays the sample period and is disabled in this sketch. Transaction history lists paid invoices; entry/exit and PT history remain separate tabs. No new CSS or dependencies are added.

Invoice details follow the [official TailAdmin Single Invoice demo](https://react-demo.tailadmin.com/single-invoice): issuer/member sections, an item table, totals, and footer actions. The Free repository does not include that Invoice source component; this view is assembled from the existing Dialog, Table, Badge, Separator, and typography primitives. Only known FitLife data is shown; no tax, due date, or discount breakdown is invented. Printing remains disabled in the sketch.

The invoice and service-plan lists share `components/shared/data-table` for search, pagination, the date-range label, empty states, and TailAdmin table presentation. Their row components stay specific to each feature. `data/member.ts` is the single source for member identity and shared invoice/plan types.

Only PT appointments are shown in the calendar, matching QT07/QT08. Gym access belongs to service plans and entry/exit history; Yoga/GroupX class booking is not assumed by the report.

Sample booking, cancellation, attendance confirmation, and review forms do not submit data. Profile fields are not saved, and the member-card panel does not generate a live QR code. Invoice creation/payment and plan activation remain staff-handled workflows; this prototype exposes their information to members.

The rewards screen composes existing TailAdmin Card, Badge, and Progress components: two summary cards for tier and points, a full-width progress section with spending and target amounts, and the existing basic table for tier benefits. The outer card and nested benefit cards are removed to keep the page compact. The current tier uses existing brand colors for emphasis. The year is shown beside the heading. Star, lightning, and check icons come from TailAdmin; colors come from the existing component variants and palette. No custom SVG or stylesheet is added. The progress bar compares annual spending with the next tier threshold.

The annual spending/points/tier figures are illustrative and follow the report's year-based thresholds. Backend member APIs are not implemented; the existing server only exposes its health endpoint. Role switching remains a header demo and does not enforce authorization.

## Template source and license

TailAdmin Free React Dashboard **2.5.1**, based on commit `486ed748b21e032a4432effeca4ef3684fa223d3` from the [official repository](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard).

The integration keeps the template's component styles, with FitLife branding, the Modern color tokens, Be Vietnam Pro, and a reduced demo layout. Icons are imported directly. Scoped ESLint exceptions preserve upstream shared exports and mobile synchronization effects.

Retain [TAILADMIN-LICENSE.md](./TAILADMIN-LICENSE.md) when distributing the TailAdmin-derived code.
