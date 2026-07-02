# Backend mocks (WireMock)

The frontend's single backend upstream is the **simpler-service3 API**, read from
`VITE_API_BASE_URL` (see [`../.env.example`](../.env.example)). For local UI tests
and CI the platform starts WireMock and injects its URL as that env var, so the app
talks to these stubs instead of a real service.

## Layout (WireMock `--root-dir`)

- `mappings/*.json` — one stub per external operation.
- `__files/*.json` — response bodies referenced by `bodyFileName`.

## Covered operations

| Operation | Stub |
|---|---|
| `GET /health` | `health.json` |
| `GET /` | `root.json` |
| `GET /users/:id` | `users-get.json` (echoes the id) |
| `GET /kenguroos` | `kenguroos-list.json` |
| `GET /kenguroos/:id` | `kenguroos-get.json` (echoes the id) |
| `POST /kenguroos` | `kenguroos-create.json` (201, echoes body) |
| `PUT /kenguroos/:id` | `kenguroos-update.json` (echoes id + body) |
| `DELETE /kenguroos/:id` | `kenguroos-delete.json` (204) |
| `GET /grass` | `grass-list.json` |
| `GET /grass/:id` | `grass-get.json` (echoes the id) |
| `POST /grass` | `grass-create.json` (201, echoes body) |
| `PUT /grass/:id` | `grass-update.json` (echoes id + body) |
| `DELETE /grass/:id` | `grass-delete.json` (204) |
| any unmatched request | `zzz-catch-all-unmocked.json` (priority 10 → 501, fails loudly) |

The catch-all returns `501` with a descriptive `error` body for any request that
matches no stub, so a newly-added, yet-unmocked backend call is caught rather than
silently passing.

## Error / edge-case stubs (priority 1, triggerable on demand)

Higher-priority stubs that let UI tests exercise non-happy-path responses:

- `GET /kenguroos/missing` and `GET /grass/missing` → **404** (`error-not-found.json`)
- `POST /kenguroos` or `POST /grass` with `name: "trigger-error"` → **500** (`error-server.json`)
- `POST /kenguroos` with `name: "trigger-rate-limit"` → **429** + `Retry-After` (`error-rate-limit.json`)

## Running locally

```bash
# from the repo root — serve the stubs on :8080
docker run --rm -p 8080:8080 \
  -v "$PWD/mocks:/home/wiremock:ro" \
  wiremock/wiremock:3.9.1 \
  --root-dir /home/wiremock --global-response-templating

# point the frontend at it and run the app / test suite
VITE_API_BASE_URL=http://localhost:8080 npm run dev
```

`--global-response-templating` enables the `{{jsonPath ...}}` / `{{request.pathSegments}}`
echoes used by the create/update/get stubs. This is the same configuration CI uses.
