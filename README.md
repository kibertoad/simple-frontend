# simpler-service3 frontend

A minimal React + Vite + TypeScript frontend for the
[simpler-service3](https://github.com/kibertoad/simpler-service3) Hono API.
It exercises the health check and full CRUD for the `kenguroos` and `grass`
entities, with a **configurable base URL**.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

Start the API separately (from the simpler-service3 repo):

```bash
npm run dev        # serves on http://localhost:3000
# or
docker compose up --build
```

## Configuring the base URL

The base URL is configurable three ways, in order of precedence:

1. **Runtime (UI):** change it in the "API base URL" card. It is stored in
   `localStorage`, so it persists across reloads.
2. **Build-time default:** set `VITE_API_BASE_URL` in `.env` (default
   `http://localhost:3000`).
3. **Fallback:** `http://localhost:3000` if nothing else is set.

### CORS

simpler-service3 does not send CORS headers, so a browser calling
`http://localhost:3000` directly from the dev server will be blocked. Two ways
around it:

- **Use the dev proxy (recommended):** set the base URL in the UI to `/api`.
  The Vite dev server proxies `/api/*` to `VITE_PROXY_TARGET`
  (default `http://localhost:3000`), stripping the `/api` prefix. Configure the
  target in `.env`.
- **Enable CORS on the service** and point the base URL straight at it.

## API surface consumed

- `GET /health`
- `GET|POST /kenguroos`, `GET|PUT|DELETE /kenguroos/:id` (`{ name, age }`)
- `GET|POST /grass`, `GET|PUT|DELETE /grass/:id` (`{ name, height }`)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build