# StudioSpace Frontend And Backend

Frontend for StudioSpace, built with Next.js 16 and React 19.

## 📸 Project Preview

### Homepage

![StudioSpace Homepage](./public/studiospace.png)

## Tech Stack

- **Next.js 16.4.3** (App Router) + **React 19.3.0**
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css`
- **shadcn** (base-nova style) with **Base UI** primitives in `src/components/ui`
- **Better Auth** + **MongoDB** for authentication
- **Shiki** for syntax highlighting, **Recharts** for charts, **Embla** for carousels

## Getting Started

```bash
npm install
npm run dev
```

Frontend Open [https://studiospace-frontend-three.vercel.app]


## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack, port 3000) |
| `npm run build` | Production build (also runs TypeScript) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Structure

```
src/
├── app/            # App Router routes, layout, global CSS
├── components/
│   ├── ui/         # shadcn / Base UI primitives
│   └── ...         # app components (site header, etc.)
├── hooks/          # client hooks
└── lib/            # cn re-export, Shiki highlighter
```
