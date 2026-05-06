# 🇮🇳 India Map Explorer

An interactive React application to explore all Indian states and union territories — click any state to see its capital, population, area, language, and cultural description.

---

## ✨ Features

- 🗺️ **Interactive India Map** — rendered with `react-simple-maps` + GeoJSON
- 🖱️ **Click to explore** — click any state for detailed information
- 🔍 **Search bar** — search states by name, capital, or region
- 🏷️ **Hover tooltips** — state name appears on hover
- 🎨 **Color-coded states** — each state has a unique color
- ✅ **Selected state highlight** — deep highlight on the active state
- 📱 **Responsive** — works on mobile and desktop
- 🏛️ **31 states & territories** covered with rich data

---

## 🗂️ Folder Structure

```
india-map-explorer/
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── IndiaMap.jsx     ← Map rendering + hover/click logic
    │   └── StateInfo.jsx    ← Right-panel state details
    └── data/
        └── statesData.js    ← All state data (capital, pop, area, etc.)
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Step 1 — Clone or create the project

```bash
# If cloning
git clone <your-repo-url>
cd india-map-explorer

# OR create fresh with Vite, then replace files
npm create vite@latest india-map-explorer -- --template react
cd india-map-explorer
```

### Step 2 — Install dependencies

```bash
npm install
```

This installs:
- `react` + `react-dom`
- `react-simple-maps` (map rendering)
- `d3-scale` (color utilities)
- `vite` + `@vitejs/plugin-react` (dev tooling)

### Step 3 — Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview with:

```bash
npm run preview
```

---

## 🌐 Deploy on Vercel

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# From project root
vercel

# Follow prompts:
# → Framework: Vite (auto-detected)
# → Build command: npm run build
# → Output dir: dist
```

### Option B — Vercel Dashboard (no CLI)

1. Push project to GitHub / GitLab / Bitbucket
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Your app is live in ~60 seconds.

The `vercel.json` in the project root handles:
- Correct build command
- SPA routing (rewrites all paths to `index.html`)

---

## 🗺️ How the Map Works

The map fetches GeoJSON at runtime from GitHub raw content:

```
https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States
```

Each geographic feature's `NAME_1` or `ST_NM` property is matched against `statesData.js` to colour and populate the info panel.

**Supported property keys** (the app tries all of these):
- `NAME_1` — from Natural Earth / GADM sources
- `ST_NM` — from Survey of India sources
- `name` — generic fallback

---

## ➕ Adding More States / Updating Data

Edit `src/data/statesData.js`:

```js
export const statesData = {
  "Your State": {
    capital: "City Name",
    population: "X million",
    area: "XXX km²",
    language: "Language",
    founded: "YYYY",
    region: "Region of India",
    description: "Short cultural description.",
    color: "#HEXCODE"   // unique colour on the map
  },
  // ...
};
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| Map | react-simple-maps 3 |
| Styling | Plain CSS with CSS variables |
| Data | Static JS module |
| Deployment | Vercel |

---

## 📄 License

MIT — free to use, modify, and distribute.
