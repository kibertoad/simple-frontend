import { useCallback, useEffect, useState } from 'react'
import { getHealth } from '../api'

type State = 'unknown' | 'ok' | 'down'

// Reruns whenever `refreshKey` changes (e.g. after the base URL is updated).
export default function Health({ refreshKey }: { refreshKey: number }) {
  const [state, setState] = useState<State>('unknown')
  const [detail, setDetail] = useState('')

  const check = useCallback(async () => {
    setState('unknown')
    setDetail('')
    try {
      const res = await getHealth()
      setState('ok')
      setDetail(res.status)
    } catch (err) {
      setState('down')
      setDetail(err instanceof Error ? err.message : String(err))
    }
  }, [])

  useEffect(() => {
    check()
  }, [check, refreshKey])

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="status-pill">
          <span className={`dot ${state === 'unknown' ? '' : state}`} />
          Service:{' '}
          {state === 'ok'
            ? `healthy (${detail})`
            : state === 'down'
              ? 'unreachable'
              : 'checking…'}
        </span>
        <button className="secondary" onClick={check}>
          Re-check
        </button>
      </div>
      {state === 'down' && detail && <div className="error">{detail}</div>}
    </div>
  )
}
