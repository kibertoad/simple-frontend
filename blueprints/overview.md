# simpler-service3-frontend

> Generated service blueprint. Read this overview first for the
> high-level structure; open `modules/<name>.md` only for a module
> directly relevant to your task.

A React + Vite + TypeScript single-page client for the simpler-service3 Hono API. It monitors service health, lets users configure which API instance to talk to at runtime, and exercises full CRUD over two business entities (kenguroos and grass).

## Modules

### [Kenguroos](modules/kenguroos.md)

Kangaroo records domain — an aggregate identified by id with a name and age. Provides list/get/create/update/delete over the /kenguroos resource and a UI panel for managing them.

### [Grass](modules/grass.md)

Grass records domain — an aggregate identified by id with a name and height. Provides list/get/create/update/delete over the /grass resource and a UI panel for managing them.

### [Record Management](modules/record-management.md)

Shared editing surface that renders any name+numeric entity as a table with add/edit/delete/refresh interactions, parameterized per aggregate via EntityConfig. Backs both the Kenguroos and Grass domains.

### [Service Health](modules/service-health.md)

Monitoring capability that probes the backend /health (and root) endpoints and surfaces reachable/healthy/unreachable status to the user.

### [API Connection](modules/api-connection.md)

Lets users point the client at any simpler-service3 instance at runtime — the configurable, localStorage-persisted API base URL, its build-time default, and the settings UI to change or reset it.

### [infrastructure](modules/infrastructure.md)

Cross-cutting technical plumbing: the HTTP transport/fetch wrapper and ApiError handling, app bootstrap and shell, branding, styling, dev-server proxy, TypeScript config, and build tooling.
