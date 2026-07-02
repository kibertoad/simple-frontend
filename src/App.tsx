import { useState } from 'react'
import * as api from './api'
import type { Grass, Kenguroo } from './api'
import Settings from './components/Settings'
import Health from './components/Health'
import CrudPanel, { type EntityConfig } from './components/CrudPanel'
import CatLogo from './components/CatLogo'

const kenguroosConfig: EntityConfig<Kenguroo> = {
  title: 'Kenguroos',
  numericField: 'age',
  numericLabel: 'Age',
  list: api.listKenguroos,
  create: ({ name, num }) => api.createKenguroo({ name, age: num }),
  update: (id, { name, num }) =>
    api.updateKenguroo(id, { name, age: num }),
  remove: api.deleteKenguroo,
}

const grassConfig: EntityConfig<Grass> = {
  title: 'Grass',
  numericField: 'height',
  numericLabel: 'Height',
  list: api.listGrass,
  create: ({ name, num }) => api.createGrass({ name, height: num }),
  update: (id, { name, num }) => api.updateGrass(id, { name, height: num }),
  remove: api.deleteGrass,
}

export default function App() {
  // Bumping this key forces child panels to reload after the base URL changes.
  const [refreshKey, setRefreshKey] = useState(0)
  const bump = () => setRefreshKey((k) => k + 1)

  return (
    <div className="app">
      <header className="app-header">
        <CatLogo className="app-logo" size={56} />
        <h1>simpler-service3 client</h1>
      </header>
      <p className="subtitle">
        A small React frontend for the Hono API (kenguroos and grass).
      </p>

      <button type="button">This is hello</button>

      <Settings onChange={bump} />
      <Health refreshKey={refreshKey} />
      <CrudPanel config={kenguroosConfig} refreshKey={refreshKey} />
      <CrudPanel config={grassConfig} refreshKey={refreshKey} />
    </div>
  )
}
