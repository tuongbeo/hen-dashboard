# Hẹn Analytics Dashboard

Single-page synthetic product analytics dashboard for a product-prioritization workshop. The dataset is intentionally designed so that multiple objectives can be defended from the same evidence.

## Stack

- React + Vite
- Tailwind CSS
- shadcn/ui-style local primitives
- Recharts
- Static synthetic data (no backend, no database)

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output directory: `dist`

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: none

## Workshop design intent

The dashboard deliberately contains competing signals:

- Bookings, GMV and active studios are growing.
- Conversion is slightly deteriorating.
- Cancellation and support load are rising sharply.
- Repeat booking and studio activation are weak.
- Studio operations still require substantial manual handling.

This allows different teams to select different priorities before converging on a shared objective.

## Dashboard structure

- `src/App.jsx`: single page with Executive KPI, Booking trend, Booking funnel, Cancellation trend/reasons, Customer behaviour, Studio operations, Business metrics, Support tickets and Evidence board.
- `src/lib/data.js`: all hardcoded synthetic data. No API requests, backend or database.
- `src/components/ui/`: local Card and Badge primitives inspired by shadcn/ui; no shadcn registry dependency.
- `src/index.css`, `tailwind.config.js`: responsive analytics styling.
- `tests/data.test.js`: checks funnel consistency, totals and competing growth/quality signals.
- `tests/browser/dashboard.spec.js`: production preview smoke tests at desktop 1440px and mobile 390px, charts, section navigation, horizontal overflow and console errors.
- `.github/workflows/verify.yml`: install, data checks, production build and Chromium QA on push to main.

## Dataset semantics

The source dashboard is preserved with two accuracy corrections: cancellation increases are shown as negative outcomes with an upward arrow, and the Studio view → Select slot loss is 59% of studio viewers (37.2 percentage points of all entrants).

W1–W12 are weekly snapshots of rolling 30-day booking totals, not disjoint weekly totals; do not sum them. Executive KPI uses the latest 30-day window, with comparisons to W4. The funnel covers unique users over Q3 2026 and must not be equated to the latest booking-event KPI. Other metrics have their own comparison labels. Cancellation reason shares total 100%; support categories total 1,240 tickets. Targets are hypothetical training inputs, not mandated business goals. Interview and sales evidence are synthetic too. Growth, conversion, retention, manual work, support and revenue concentration intentionally compete for priority.

## Test plan

Use Node.js 22.12+ (`.node-version` selects Node 22).

```bash
npm install
npm run test:data
npm run build
npx playwright install chromium
npm run test:e2e
```

CI runs these steps on Linux, installs Chromium system dependencies and uploads `dashboard-qa` with screenshots, the generated lockfile and `dist`. Chart tooltips work on hover; header period and studio scope are fixed labels, not filters. Section links navigate within the same page.

## Cloudflare deployment steps

1. Open **Workers & Pages → Create application → Pages → Import from an existing Git repository**.
2. Connect `tuongbeo/hen-dashboard`, select production branch `main`, and leave root directory at repository root.
3. Framework: **Vite**; build command: **npm run build**; output directory: **dist**; environment variables: **none**.
4. Save and Deploy. Cloudflare installs npm dependencies and creates the `pages.dev` URL.
5. In the Pages project, open **Custom domains → Set up a domain** and enter the desired domain. Follow the DNS instructions. An apex domain requires the zone on Cloudflare; an externally managed subdomain can use a CNAME to the Pages hostname after association in the Pages project.

No Worker, Pages Functions, API keys or database binding is required. Future pushes to `main` trigger deployments.

Official references:
- https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
