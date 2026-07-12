# SAST Website

<p align="center">
  <img src="./public/assets/banner-animated.svg" width="100%" alt="SAST Space Animation" />
</p>

This sub-directory contains the frontend codebase for the SAST Website, built with **Vite + React + React Router**.

---

## 💻 Run it locally

```bash
npm install
npm run dev
```

Open the localhost URL printed in the terminal.

For a production build:
```bash
npm run build
npm run preview
```

---

## ✏️ Editing content

All content lives in `src/data/` as plain JSON/JS data files. This allows updating text/roster details without touching the design code:
- `src/data/projects.json` — project gallery
- `src/data/events.json` — upcoming and past events
- `src/data/team.json` — member roster and division roles

---

## 🌐 Deploy to GitHub Pages

To compile and push updates to the live site:
```bash
npm run deploy
```

Live site URL:
👉 **https://SASTxNST.github.io/SAST_A_NEW_REALM/**
