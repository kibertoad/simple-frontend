# WireMock mocks — simpler-service3 backend upstream

These stubs mock the **simpler-service3 Hono API**, the only backend upstream this
frontend calls. The app reads its base URL from `VITE_API_BASE_URL` (see `.env.example` /
`src/config.ts`); in the UI-test flow the platform resolves that to the WireMock server and
serves these mappings, so the app builds and runs end-to-end without a real backend.

Layout is WireMock's `--root-dir` convention:

- `mappings/` — one stub per external operation (matched on method + URL path).
- `__files/` — response body fixtures referenced via `bodyFileName`.

## Coverage

| Operation | Method + path | Stub |
|-----------|---------------|------|
| Health check | `GET /health` | `health.json` → 200 |
| Root probe | `GET /` | `root.json` → 200 |
| Get user | `GET /users/{id}` | `get-user.json` → 200 (echoes id) |
| List kenguroos | `GET /kenguroos` | `list-kenguroos.json` → 200 |
| Get kenguroo | `GET /kenguroos/{id}` | `get-kenguroo.json` → 200 (echoes id) |
| Create kenguroo | `POST /kenguroos` | `create-kenguroo.json` → 201 (echoes body) |
| Update kenguroo | `PUT /kenguroos/{id}` | `update-kenguroo.json` → 200 (echoes id + body) |
| Delete kenguroo | `DELETE /kenguroos/{id}` | `delete-kenguroo.json` → 204 |
| List grass | `GET /grass` | `list-grass.json` → 200 |
| Get grass | `GET /grass/{id}` | `get-grass.json` → 200 (echoes id) |
| Create grass | `POST /grass` | `create-grass.json` → 201 (echoes body) |
| Update grass | `PUT /grass/{id}` | `update-grass.json` → 200 (echoes id + body) |
| Delete grass | `DELETE /grass/{id}` | `delete-grass.json` → 204 |

## Error / edge stubs (priority 1, triggerable on demand)

- `GET /kenguroos/missing` and `GET /grass/missing` → **404** (`error-not-found.json`)
- `POST /kenguroos` or `POST /grass` with `name: "trigger-error"` → **500** (`error-server.json`)
- `POST /kenguroos` with `name: "trigger-rate-limit"` → **429** + `Retry-After` (`error-rate-limit.json`)

## Catch-all

`zzz-catch-all.json` (priority 100) returns **501** with `WIREMOCK_NO_STUB_MATCHED` for any
request no other stub matches, so a new unmocked route fails loudly instead of silently.
