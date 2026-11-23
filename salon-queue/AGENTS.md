# AGENTS.md — Salon Queue Management
Queue app for a salon: customers join from their phone, see wait time, get called; reception and barbers manage the queue; TV display.

## Read first
- docs/01-brief.md -> features + what NOT to build
- docs/02-screens.md -> every screen's layout and behaviour
- docs/03-flows-rules.md -> flows, queue rules, test checklist

## Stack
React + Vite + Tailwind CSS. Run with `npm run dev`.
Storage: localStorage + `storage` event (src/store.js). Simplest option that syncs windows of the same browser; swap for Firebase/Supabase for cross-device sync.
Hosting: Vercel (frontend). Live link must be the first line after the title in README.md.

## How to work
- One screen or one feature per task. Don't touch other screens.
- Theme: charcoal (#1F2937) + gold (#D4A017); rounded cards.
- All labels via the EN/GU file (src/i18n.js); no hard-coded text.
- Queue rules live in ONE place (src/store.js); reuse them everywhere.
- Never add features from the 'Don't build' list.
- After each task: list changed files and how to test the change.
