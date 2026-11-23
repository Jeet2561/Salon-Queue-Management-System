# Salon Queue Management System

**Live demo:** https://REPLACE-WITH-YOUR-VERCEL-URL.vercel.app
**Hosted on:** Vercel (frontend only)
**Staff PIN (Reception / Barber / Owner):** `1234`

## About
Mobile-first queue app for a salon: customers join from their phone, see position and wait time, get called; reception, barbers and a waiting-area TV stay in sync. English + Gujarati.

Routes: `/` `/join` `/status/:id` `/reception` `/barber/:id` `/display` `/admin`

## Run
`npm install && npm run dev`

## Notes
- State is kept in localStorage and synced between windows of the same browser via the `storage` event. For true phone/tablet/TV sync across devices, swap `src/store.js` for Firebase/Supabase.
- Owner screen has "Load demo data" to test Call next / No-show / Cancel.
- Docs: `AGENTS.md`, `docs/`.
