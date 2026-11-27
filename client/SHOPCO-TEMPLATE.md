# Shopco frontend adaptation

Source: https://github.com/mohammadoftadeh/next-ecommerce-shopco
Reference commit: `f360acb62dbccdeb421d0c261652deedc74829fd`
License: [MIT](SHOPCO-LICENSE), retained alongside these adaptations.

The application remains React/Vite. No Next.js server or Shopco commerce backend is introduced.

## Source mapping

- `src/styles/fonts/*`: original Satoshi and Integral CF WOFF2 files copied into `public/fonts/shopco/`.
- `src/styles/globals.css`, `tailwind.config.ts`: light theme tokens, fonts, frame width (77.5rem), monochrome surfaces, borders and radii adapted to Tailwind 4 in `src/index.css`.
- `src/components/layout/Navbar/TopNavbar/index.tsx`: sticky white navigation, logo typography, pill search and action icons adapted in FitLife Header. Search is omitted; role-specific page links appear in the horizontal header.
- `src/components/layout/Footer/index.tsx`, `NewsLetterSection.tsx`: gray footer and rounded black callout adapted to FitLife navigation. No newsletter subscription is simulated.
- `src/components/ui/button.tsx`, `input-group.tsx`: button variants, disabled/focus states and rounded gray input styles adapted while preserving existing Base UI APIs.
- `src/components/product-page/Tabs/index.tsx`: full-width tabs with a black active underline.
- `src/components/common/ProductCard.tsx`, `shop-page/filters/`: product grid, warm gray image surface, 13/20px radius, hover zoom and filter panel.
- `src/components/product-page/Tabs/ReviewsContent.tsx`: white bordered rounded surfaces used for shared cards and operational tables/dialogs, which have no direct commerce-template equivalent.

Inter is used for all Vietnamese body text and headings, with its Vietnamese subset included locally. Integral CF is retained for the English wordmark, service names and footer callout.

The root `/` now renders the template-based homepage instead of redirecting to the member schedule. Original hero images (desktop/mobile), stars and DressStyle images are copied unchanged into `public/images/shopco/`. Product, package and branch content comes from existing FitLife data.

All role/page URLs continue to be generated from the unchanged `src/layouts/routes.ts`. Each role's existing pages appear as header links; changing role navigates to its existing home path. Existing page data and actions are retained. Backend and database files are outside this change.

## Homepage motion and product ratings

The homepage uses the template's Framer Motion reveal timing, once-on-scroll sections, AnimatedCounter and rotating hero stars. MotionConfig and the CSS motion-safe variant honor reduced-motion preferences. The Vietnamese hero headline uses locally included Inter 900, with a vertical scale of 0.88.

`src/components/shared/ProductRating.tsx` reuses Shopco's gold-star / fractional-fill presentation on homepage, catalog and product detail. Values in `src/data/product-ratings.ts` are frontend sample data; no real review aggregate or backend endpoint is implied.
