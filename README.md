# Silver Prime — Web

Public showcase site for Silver Prime — an Android-native, privacy-first, hybrid AI assistant.

> The mobile app lives in a separate repo. This repo is the marketing / waitlist / roadmap site only.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- Framer Motion + React Three Fiber for the orb and choreography
- Netlify deploy with branch previews

## Develop

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run build        # production build
```

`--legacy-peer-deps` is required while `@react-three/fiber` v9 declares a React 19 peer against Next 14's React 18.

## Editing content

The roadmap is driven by one typed source of truth:

- `content/roadmap.ts` — three lanes (`past`, `present`, `future`) of `Milestone` objects. Flip `status` and add `shippedOn` to change the UI. Page regenerates on next build.

## Deploying

Push to `main`. Netlify picks it up from `netlify.toml`. Branch pushes create preview URLs automatically.

## Today

- `/` — landing (hero orb, pillars, waitlist)
- `/roadmap` — three-lane progression

## Next

Manifesto page, features deep-dives, MDX docs, changelog from GitHub Releases. See the roadmap.
