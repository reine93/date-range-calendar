# Date Range Calendar

A Next.js (App Router) project that renders a hotel-style date range selector with pricing, disabled/check-out days, and a polished desktop/mobile experience. Styling is Tailwind-driven via a shared style config, with mock data served by `json-server` or any external calendar API.

## Stack

- Next.js 16 (App Router) with TypeScript
- Tailwind utility classes (centralized in `app/components/style-config`)
- `react-day-picker` for calendars
- `json-server` mock API (optional, port 4000)
- Concurrent scripts via `concurrently`

## Project Structure

- `app/page.tsx` — Home entry.
- `app/components/` — Calendar UI
- `app/api/calendar/route.ts` — Server Route fetching external calendar data; normalizes via `lib/calendar-normalize`.
- `lib/` — Data normalization/types for calendar payloads.
- `mock-api/` — `db.json` served by json-server at `http://localhost:4000/rawcalendar` (default).
- `app/components/style-config/` — Styling configuration for layout, form, day picker, legends.

## Scripts

Use `start-calendar` to run the full stack locally in one command:

```bash
npm run start-calendar
```

Or run the steps manually:

```bash
npm run build
npm run mock-api
npm run start
```

## Data & API

- Server Route: `app/api/calendar/route.ts` fetches from `EXTERNAL_CALENDAR_URL` (falls back to `http://localhost:4000/rawcalendar`).
- Mock data lives in `mock-api/db.json` and is served by `json-server`.

## Running Locally

```bash
npm install
npm run start-calendar   # build + mock API + start
# or
npm run dev:all          # mock API + dev server (no build)
```

Open http://localhost:3000 and ensure the mock API is on http://localhost:4000 if you use the default.

## Key Features

- Two-month desktop view with centered captions, custom weekday formatting, range styling, and availability legend footer.
- Mobile sheet/popup with scrollable months, fades, and sticky input/CTA.
- Pricing and disabled/check-out handling with custom DayPicker components.
- Tailwind classes centralized for easy theming.
