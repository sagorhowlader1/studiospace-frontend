<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Early-stage App Router app on Next.js 16.4.3 and React 19.3.0. Only `/` exists; `src/components/ui` is shadcn-generated. `README.md` is still create-next-app boilerplate and does not describe this setup.

## Commands

- `npm run dev` — Turbopack dev server (port 3000). Dev route types are written to `.next/dev/types`.
- `npm run build` — production build and the main verification step; it also runs TypeScript.
- `npm run lint` — ESLint flat config. It currently fails on `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` with `react-hooks/set-state-in-effect`; this is the current baseline, not a setup error.
- `npx next typegen`, then `npx tsc --noEmit` — typecheck without a full build. Run `typegen` first: `LayoutProps`, `PageProps`, and route types are generated into `.next/dev/types`.
- No test runner or CI is configured.
- On this Windows machine PowerShell blocks `.ps1` shims, so use `npm.cmd` / `npx.cmd` (e.g. `npm.cmd run build`).

## Framework constraints

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. Keep these enabled. Without a `<Suspense>` boundary or `"use cache"`, uncached async reads trigger a blocking-route error during prerender/build; the explicit escape hatch is `export const instant = false`.
- `partialPrefetching` requires `cacheComponents`; both flags are app-wide and affect navigation/prefetch behavior.
- Route props rely on generated globals such as `LayoutProps<"/">`, not handwritten `{ children }` types. Run `next typegen` after adding routes.
- Read the bundled 16.4 docs in `node_modules/next/dist/docs/` before using unfamiliar APIs. Start with `01-app/01-getting-started/08-caching.md` and `01-app/03-api-reference/05-config/01-next-config-js/` for these flags.
- Do not edit `next-env.d.ts`; it is regenerated.

## Styling and UI

- Tailwind CSS v4, with no `tailwind.config.*`. Theme tokens, dark-mode variant, and radius scale live in `src/app/globals.css` (`@theme inline` plus CSS variables). Add design tokens there.
- shadcn is configured as `style: "base-nova"`, `rsc: true` (`components.json`). Add primitives with `npx shadcn add <component>` rather than hand-writing them.
- UI primitives use `@base-ui/react`, not Radix. Compose via Base UI's `render` prop; there is no Radix-style `asChild`. Don't replace these with Radix components or older shadcn patterns.
- Generated components import `cn` from the `cn` package; `src/lib/utils.ts` is only a re-export. Keep imports and `components.json` aliases consistent.
- `src/lib/highlighter.tsx` lazily loads Shiki languages. To support a new language, add its import to `languages` and an optional alias; `use-highlighted-code.ts` handles streaming.

## Layout

- `src/app` — App Router routes, root layout, global CSS.
- `src/components/site-header.tsx` — global responsive header; the mobile menu is a Base UI `Sheet`.
- `src/components/ui` — shadcn / Base UI primitives.
- `src/hooks` — client hooks (`use-mobile`, `use-highlighted-code`).
- `src/lib` — `cn` re-export and Shiki highlighter.
- `@/*` maps to `./src/*` (`tsconfig.json`).
