# Ferdian Firmansyah — Portfolio

Personal portfolio website built with vanilla JavaScript (ES Modules), zero dependencies.

## Tech Stack

- **HTML5** — 48-line container, all content rendered via JS
- **CSS3** — design system with CSS custom properties, dark theme
- **JavaScript** — ES Modules, no jQuery, no framework
- **Font** — Poppins via Google Fonts

## Structure

```
├── index.html              # Entry point (container only)
├── css/
│   └── style.css           # Full design system + component styles
├── js/
│   ├── main.js             # Entry, imports & initializes all modules
│   ├── components/         # Section renderers
│   │   ├── navbar.js
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── experience.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   └── footer.js
│   ├── data/               # Content — edit here to update the site
│   │   ├── config.js       # Personal info, social links, nav
│   │   ├── experience.js   # Work history
│   │   ├── skills.js       # Skill categories
│   │   ├── projects.js     # Projects
│   │   ├── achievements.js # Certificates & awards
│   │   └── education.js    # Education history
│   └── utils/
│       ├── animation.js    # Scroll reveal, progress bar, nav spy
│       ├── icons.js        # Inline SVG icons
│       └── render.js       # renderHTML(), renderList(), escapeHTML()
├── images/
│   ├── favicon.svg         # FF monogram favicon
│   ├── ferdian.webp        # Profile photo (19 KB)
│   └── skills/             # Skill icon images
└── resume/                 # CV files (not tracked if sensitive)
```

## Update Content

All content lives in `js/data/`. No need to touch components or CSS.

| File | What to edit |
|---|---|
| `js/data/config.js` | Name, bio, social links, nav |
| `js/data/experience.js` | Work history |
| `js/data/skills.js` | Skill categories and items |
| `js/data/projects.js` | Project cards |
| `js/data/achievements.js` | Certificates & awards |
| `js/data/education.js` | Education |

## Running Locally

> ES Modules require a local server — opening `index.html` directly via `file://` will not work due to CORS.

**VS Code Live Server** (recommended)
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

**Node.js serve**
```bash
npx serve .
```

## Performance

| Asset | Size |
|---|---|
| HTML | ~2 KB |
| CSS | ~30 KB |
| JavaScript (all) | ~39 KB |
| Profile photo | 19 KB (WebP) |
| Skill icons | ~180 KB total |

No jQuery, no Bootstrap JS, no heavy dependencies.

## Notes

- `docs/` is excluded from git (see `.gitignore`) — local design docs only
- All projects are marked `private: true` — no source code links are displayed
- Google Analytics GA4 is included (`G-039VPBVHWX`)
