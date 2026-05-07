# Frontend Technical Assessment - Next.js + MUI + Zustand

This project implements:

- Next.js App Router application
- Material-UI based responsive UI
- NextAuth credentials login using DummyJSON auth API
- Zustand stores for auth, users, and products with async actions
- Users list + details
- Products list + details (with carousel)
- API-side pagination, search, category filter, and simple client-side caching

## Tech Stack

- Next.js
- Material UI (MUI)
- NextAuth
- Zustand
- DummyJSON API ([https://dummyjson.com](https://dummyjson.com))

## Why Zustand?

Zustand was chosen because it is lightweight, has a very small learning curve, and supports async actions directly in stores without boilerplate reducers/actions. For a small-medium dashboard like this, it gives cleaner state management than Redux while still keeping the logic centralized and predictable.

## Caching Strategy

List endpoints for users/products are cached in Zustand store memory using a query-key (search + page + filter) and a short TTL (5 minutes). This reduces repeated API requests when users navigate back and forth between pages, improving perceived performance and lowering unnecessary network traffic.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

3. Add a strong `NEXTAUTH_SECRET` value in `.env.local`.

4. Start development server:

```bash
npm run dev
```

5. Open:

- [http://localhost:3000](http://localhost:3000)

## Build & Lint

```bash
npm run lint
npm run build
```

## DummyJSON Login Credentials

Example working credentials from DummyJSON docs:

- Username: `emilys`
- Password: `emilyspass`

## Completed vs Pending

- Completed: all required parts in the assessment (auth, protected dashboard routes, users/products lists and detail pages, pagination/search/filter, Zustand stores, caching, responsive MUI UI, memo/useCallback/useMemo usage).
- Pending: GitHub repository creation and push (run the commands below with your GitHub username/repo).

## Create Public GitHub Repo

```bash
git init
git add .
git commit -m "Build assessment app with Next.js, MUI, NextAuth, and Zustand"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
