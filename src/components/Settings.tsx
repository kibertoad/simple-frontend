import { useState } from 'react'
import { DEFAULT_BASE_URL, getBaseUrl, resetBaseUrl, setBaseUrl } from '../config'

interface Props {
  onChange: () => void
}

// Lets the user point the app at any simpler-service3 instance at runtime.
// Tip: set this to "/api" to route through the Vite dev proxy and avoid CORS.
export default function Settings({ onChange }: Props) {
  const [value, setValue] = useState(getBaseUrl())

  const apply = () => {
    setBaseUrl(value)
    setValue(getBaseUrl())
    onChange()
  }

  const reset = () => {
    resetBaseUrl()
    setValue(getBaseUrl())
    onChange()
  }

  return (
    <div className="card">
      <h2>API base URL</h2>
      <div className="inline-form">
        <label style={{ flex: 1, minWidth: 260 }}>
          Base URL
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={DEFAULT_BASE_URL}
            onKeyDown={(e) => e.key === 'Enter' && apply()}
          />
        </label>
        <button onClick={apply}>Apply</button>
        <button className="secondary" onClick={reset}>
          Reset to default
        </button>
      </div>
      <p className="muted" style={{ marginBottom: 0 }}>
        Default: <code>{DEFAULT_BASE_URL}</code>. Use <code>/api</code> to go
        through the dev proxy (no CORS needed).
      </p>
    </div>
  )
}
