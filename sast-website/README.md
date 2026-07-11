# SAST Website

Multi-page React site for the Society for Aerospace and Technology, built with
Vite + React + React Router.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. For a production build:

```bash
npm run build
npm run preview
```

`npm run build` outputs a static `dist/` folder — deploy that anywhere
(Vercel, Netlify, GitHub Pages, your own server).

## Editing content

All real content lives in `src/data/` as plain JS files, separate from the
page layouts, so you can update text without touching design code:

- `src/data/divisions.js` — club sub-teams
- `src/data/projects.js` — project gallery
- `src/data/achievements.js` — mission-log timeline
- `src/data/events.js` — upcoming + past events
- `src/data/team.js` — member roster

Everything in these files is placeholder content marked `EDIT ME` — swap in
SAST's real projects, events, achievements, and member names/photos.

For team/project photos: drop images into `public/assets/` and set the
`image` field in the relevant data file to `/assets/your-file.jpg`.

## The join form

`src/pages/Join.jsx` currently confirms submissions locally (no backend yet).
Before launch, wire the `handleSubmit` function up to a real endpoint —
Formspree, a Google Form, or EmailJS are the fastest options for a club site
with no backend team.

## Design system

Tokens (colors, fonts, spacing) live at the top of `src/index.css`. The
signature orbit-ring motif is `src/components/OrbitRing.jsx`, reused across
pages. Fonts: Michroma (display), Inter (body), IBM Plex Mono (data/eyebrows) —
loaded via Google Fonts in `index.html`.
