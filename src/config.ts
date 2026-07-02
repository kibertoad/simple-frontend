const STORAGE_KEY = 'apiBaseUrl'

// Default base URL: the value baked in at build time via VITE_API_BASE_URL,
// falling back to the local service.
const DEFAULT_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

// The runtime base URL is configurable and persisted in localStorage, so it
// survives reloads and can be changed without rebuilding.
export function getBaseUrl(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_BASE_URL
}

export function setBaseUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY, url.trim().replace(/\/+$/, ''))
}

export function resetBaseUrl(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export { DEFAULT_BASE_URL }
