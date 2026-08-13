# Frontend — AI Shopping System

This folder contains the React + Vite frontend for the AI Shopping System.

## Quick start

1. Install dependencies

```bash
cd frontend
npm install
```

2. Start the dev server

```bash
npm run dev
```

The Vite dev server usually runs at http://localhost:5173.

## API configuration

The frontend API client (`frontend/src/services/api.js`) currently points to a deployed backend URL by default. For local development either:

- Update `frontend/src/services/api.js` to point to `http://localhost:5000/api`, or
- Modify the file to use `import.meta.env.VITE_API_URL` and set `VITE_API_URL=http://localhost:5000` in `frontend/.env`.

## Notable files

- `src/components` — Reusable UI components (Navbar, ProductCard, ProductGrid, etc.).
- `src/pages` — Route-level pages (Home, Wishlist, Compare, Auth, AuthSuccess).
- `src/context/AuthContext.jsx` — Authentication context and provider.
- `src/services` — API wrappers for auth, product search, comparison, wishlist.

## Running production build

```bash
npm run build
npm run preview
```

## License
See the project root README for license information.
