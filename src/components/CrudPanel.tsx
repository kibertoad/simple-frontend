import { useCallback, useEffect, useState } from 'react'

// A record with an id, a name, and one extra numeric field whose key varies
// per entity (age for kenguroos, height for grass).
export interface EntityConfig<T extends { id: string; name: string }> {
  title: string
  numericField: keyof T & string
  numericLabel: string
  list: () => Promise<T[]>
  create: (input: { name: string; num: number }) => Promise<T>
  update: (id: string, input: { name?: string; num?: number }) => Promise<T>
  remove: (id: string) => Promise<void>
}

export default function CrudPanel<T extends { id: string; name: string }>({
  config,
  refreshKey,
}: {
  config: EntityConfig<T>
  refreshKey: number
}) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [num, setNum] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setItems(await config.list())
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [config])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  const add = async () => {
    setError('')
    try {
      await config.create({ name: name.trim(), num: Number(num) })
      setName('')
      setNum('')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const del = async (id: string) => {
    setError('')
    try {
      await config.remove(id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const edit = async (item: T) => {
    const nextName = window.prompt(`New name for "${item.name}"`, item.name)
    if (nextName === null) return
    const current = String(item[config.numericField])
    const nextNum = window.prompt(`New ${config.numericLabel}`, current)
    if (nextNum === null) return
    setError('')
    try {
      await config.update(item.id, {
        name: nextName.trim(),
        num: Number(nextNum),
      })
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const canAdd = name.trim() !== '' && num.trim() !== '' && !Number.isNaN(Number(num))

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2>{config.title}</h2>
        <button className="secondary" onClick={load} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="inline-form">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          {config.numericLabel}
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </label>
        <button onClick={add} disabled={!canAdd}>
          Add
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {items.length === 0 && !loading ? (
        <p className="muted">No records yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>{config.numericLabel}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{String(item[config.numericField])}</td>
                <td className="row" style={{ justifyContent: 'flex-end' }}>
                  <button className="secondary" onClick={() => edit(item)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => del(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
