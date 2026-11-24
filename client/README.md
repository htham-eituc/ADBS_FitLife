# FitLife Frontend

A lightweight UI sketch built with React, TypeScript, Vite, React Router, Tailwind CSS v4, and TailAdmin components. The interface uses the **Modern** palette, **Inter (UI) and Manrope (headings and KPIs)**, and a light theme.

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
├── data/             # Demo data: member, branch catalog/stock, front desk, staff/payroll, reports
├── hooks/            # Mobile breakpoint detection
├── icons/            # SVG components used by the sketch
├── layouts/          # MainLayout, role menus (navigation.ts), URL mapping (routes.ts)
├── pages/            # Member screens plus front-desk/, sales/, trainer/, manager/, director/, gate/
├── utils/            # Tailwind class merging
├── App.tsx           # Routes screens inside MainLayout
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

Keep the template's component styling. Typography uses locally bundled Inter for UI text and Manrope for headings and KPIs, with weights 400, 500, 600, and 700 via `@fontsource/inter` and `@fontsource/manrope`. The font tokens are `--font-ui` and `--font-heading`. Charts use Inter for labels, legends, and tooltips.

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

## Staff screens

The header role menu lists every actor from the process specification. Choosing a role swaps the sidebar to that role's menu (`NAVIGATION` in `layouts/navigation.ts`) and opens its first screen:

| Role | Screens | Processes |
|---|---|---|
| Lễ tân | Members (search, register, edit, card/QR code), Point of sale (cash received for cash payments), Entry/exit with manual opening, PT bookings, Member care with viewer-chosen thresholds | QT02, QT03, QT06, QT07, QT11 |
| Nhân viên bán hàng | Point of sale, Stock receipts, Inventory | QT03, QT05 |
| Huấn luyện viên | Teaching schedule, Reviews, Payslip by branch | QT07, QT08, QT10 |
| Quản lý chi nhánh | Catalog (branch, gates, packages, products), Staff (hiring, transfers, resignation), Payroll, Branch reports including a member's visit and PT history | QT01, QT09, QT10, QT11 |
| Ban giám đốc | System reports, Tier thresholds | QT04, QT11 |
| Cửa kiểm soát | Card/QR scan form and recent entries | QT06 |

Fields shown on staff screens follow the ERD in the Phase 1 report (for example `CHECKIN.manual_by/manual_reason`, `PAYSLIP` with `PAYSLIP_COMMISSION` per branch, `WORK_ASSIGNMENT` for transfers). Business rules such as tier discounts, points, stock checks, check-in validation and PT overbooking are left to the database; the screens only collect input and show results, and saving actions stay disabled like the member screens. Threshold figures in the demo data are sample rows, not fixed rules.

Staff screens reuse `PageHeading`, `InfoTable`, `DataTable`, `SketchDialog`, `FormSelect` and `InfoField`; `components/shared/StaffPage.tsx` adds a status badge, stat card, section card, bar list (built on Progress) and controlled select/input fields. Report charts are progress bars, so no chart dependency is added.

## Template source and license

TailAdmin Free React Dashboard **2.5.1**, based on commit `486ed748b21e032a4432effeca4ef3684fa223d3` from the [official repository](https://github.com/TailAdmin/free-react-tailwind-admin-dashboard).

The integration keeps the template's component styles, with FitLife branding, the Modern color tokens, Inter and Manrope, and a reduced demo layout. Icons are imported directly. Scoped ESLint exceptions preserve upstream shared exports and mobile synchronization effects.

Retain [TAILADMIN-LICENSE.md](./TAILADMIN-LICENSE.md) when distributing the TailAdmin-derived code.

## Frontend URLs

Each screen has a browser URL, defined in `src/layouts/routes.ts`. Menu links, direct entry, reload, and browser Back/Forward use the same route mapping. The role selector navigates to the selected role's first screen; the URL determines the displayed role and menu.

| Role | URLs |
|---|---|
| Member | `/member/schedule`, `/member/plans`, `/member/orders`, `/member/billing`, `/member/history`, `/member/rewards`, `/member/profile` |
| Reception | `/reception/members`, `/reception/pos`, `/reception/check-ins`, `/reception/pt-bookings`, `/reception/member-care` |
| Sales | `/sales/pos`, `/sales/stock-receipts`, `/sales/inventory` |
| Trainer | `/trainer/schedule`, `/trainer/reviews`, `/trainer/payslip` |
| Branch manager | `/admin/catalog`, `/admin/staff`, `/admin/payroll`, `/admin/reports` |
| Director | `/director/reports`, `/director/tiers` |
| Access gate | `/gate` |

`/` redirects to `/member/schedule`. Role base URLs (`/member`, `/admin`, `/reception`, `/sales`, `/trainer`, `/director`) redirect to that role's first screen. Legacy member paths such as `/schedule` and `/plans` redirect to their `/member/...` equivalents, preserving query strings and fragments. Unknown URLs show a not-found screen.

These routes belong to the frontend UI demo; they do not add authentication or backend API endpoints. For static production hosting, configure SPA fallback so frontend paths serve `client/dist/index.html`; keep asset files and backend API routes separate. Vite dev and preview support direct entry to frontend paths.

### Member ordering preview

`/member/orders` reuses Card, Badge, Button, SelectField and InputGroup for a marketplace product grid, plus the member DataTable, InfoTable, Tabs, form fields, and SketchDialog for cart and order history. Members can search the current branch's product fixtures, edit a cart, review their tier discount, confirm a pickup order, inspect it, and cancel a pending order. Payment takes place at the branch counter. Orders and reserved quantities use local component state only; navigating away or reloading resets this preview. No backend writes or payment requests are made.

The product grid supports search, category filters, price/name sorting, product details, and adding items to the cart. Illustrative unbranded product images were generated with imagegen and are bundled under `public/images/products/`; they are demo assets rather than photos of actual inventory. Product image and description mapping lives in `src/data/product-visuals.ts`. No new CSS or UI dependencies are added for this layout.
