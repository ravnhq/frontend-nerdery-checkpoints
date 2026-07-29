import { useState } from 'react'
import type { FormState } from './formState'
import { StatusBanner } from './StatusBanner'
import './index.css'

// Runnable demo shown in the dev server: cycle through every FormState variant
// and see how StatusBanner reacts.
const STATES: FormState[] = [
  { status: 'idle' },
  { status: 'submitting' },
  { status: 'success', id: '42' },
  { status: 'error', message: 'Something went wrong' },
]

export default function Demo() {
  const [state, setState] = useState<FormState>(STATES[0])

  return (
    <main
      style={{
        fontFamily: 'system-ui',
        maxWidth: 640,
        margin: '1rem auto',
        padding: '0 1rem',
      }}
    >
      <h1 className="ts-title">Form status</h1>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {STATES.map((next) => (
          <button
            className="ts-button"
            key={next.status}
            onClick={() => setState(next)}
          >
            {next.status}
          </button>
        ))}
      </div>
      <StatusBanner state={state} />
    </main>
  )
}
