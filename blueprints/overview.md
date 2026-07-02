# simpler-service3 Client

> Generated service blueprint. Read this overview first for the
> high-level structure; open `modules/<name>.md` only for a module
> directly relevant to your task.

A small React + Vite single-page frontend that consumes the simpler-service3 Hono API, letting users manage two business entities (kenguroos and grass) via CRUD panels and monitor/reconfigure the backend connection at runtime.

## Modules

### [Kenguroo Management](modules/kenguroo-management.md)

The kenguroo domain: kenguroos are named animals with an age. Provides list/get/create/update/delete against the /kenguroos API and drives its CRUD panel (name + age).

### [Grass Management](modules/grass-management.md)

The grass domain: grass records are named entries with a height. Provides list/get/create/update/delete against the /grass API and drives its CRUD panel (name + height).

### [Service Connectivity](modules/service-connectivity.md)

Domain of the app's relationship with its backend: monitoring service health and letting operators point the client at any simpler-service3 instance at runtime (base URL selection, health checks, root/user probes).

### [infrastructure](modules/infrastructure.md)

Cross-cutting technical plumbing: the HTTP transport/error layer, runtime base-URL configuration and persistence, the generic reusable CRUD panel component, app bootstrap, and Vite/TypeScript build + dev-proxy configuration.
