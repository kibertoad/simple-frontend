import { getBaseUrl } from './config'

export interface Kenguroo {
  id: string
  name: string
  age: number
}

export interface Grass {
  id: string
  name: string
  height: number
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getBaseUrl()
  let res: Response
  try {
    res = await fetch(`${base}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })
  } catch (err) {
    throw new ApiError(
      0,
      `Network error reaching ${base}${path}. Is the service running and CORS allowed? (${
        err instanceof Error ? err.message : String(err)
      })`,
    )
  }

  if (res.status === 204) {
    return undefined as T
  }

  const text = await res.text()
  const body = text ? JSON.parse(text) : undefined

  if (!res.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body
        ? String(body.error)
        : `Request failed with status ${res.status}`
    throw new ApiError(res.status, message)
  }

  return body as T
}

// Health / root
export const getHealth = () => request<{ status: string }>('/health')
export const getRoot = () => request<{ message: string }>('/')
export const getUser = (id: string) =>
  request<{ user: { id: string } }>(`/users/${encodeURIComponent(id)}`)

// Kenguroos
export const listKenguroos = () =>
  request<{ kenguroos: Kenguroo[] }>('/kenguroos').then((r) => r.kenguroos)

export const getKenguroo = (id: string) =>
  request<{ kenguroo: Kenguroo }>(`/kenguroos/${encodeURIComponent(id)}`).then(
    (r) => r.kenguroo,
  )

export const createKenguroo = (input: { name: string; age: number }) =>
  request<{ kenguroo: Kenguroo }>('/kenguroos', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((r) => r.kenguroo)

export const updateKenguroo = (
  id: string,
  input: { name?: string; age?: number },
) =>
  request<{ kenguroo: Kenguroo }>(`/kenguroos/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  }).then((r) => r.kenguroo)

export const deleteKenguroo = (id: string) =>
  request<void>(`/kenguroos/${encodeURIComponent(id)}`, { method: 'DELETE' })

// Grass
export const listGrass = () =>
  request<{ grass: Grass[] }>('/grass').then((r) => r.grass)

export const getGrass = (id: string) =>
  request<{ grass: Grass }>(`/grass/${encodeURIComponent(id)}`).then(
    (r) => r.grass,
  )

export const createGrass = (input: { name: string; height: number }) =>
  request<{ grass: Grass }>('/grass', {
    method: 'POST',
    body: JSON.stringify(input),
  }).then((r) => r.grass)

export const updateGrass = (
  id: string,
  input: { name?: string; height?: number },
) =>
  request<{ grass: Grass }>(`/grass/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  }).then((r) => r.grass)

export const deleteGrass = (id: string) =>
  request<void>(`/grass/${encodeURIComponent(id)}`, { method: 'DELETE' })
