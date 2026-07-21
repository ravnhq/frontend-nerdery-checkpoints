import type { FormState } from './formState'
import { StatusBanner } from './StatusBanner'
import { useLocalStorageState } from './useLocalStorageState'

// Runnable demo shown in the dev server: cycle through every FormState variant
// and see how StatusBanner reacts.
const STATES: FormState[] = [
  { status: 'idle' },
  { status: 'submitting' },
  { status: 'success', id: '42' },
  { status: 'error', message: 'Something went wrong' },
]

export default function Demo() {
  const [state, setState] = useLocalStorageState<FormState>('form-demo-state', STATES[0])

  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '1rem auto', padding: '0 1rem' }}>
      <h1>Form status</h1>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {STATES.map((next) => (
          <button
            key={next.status}
            type="button"
            onClick={() => setState(next)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: next.status === state.status ? 'bold' : 'normal',
              border: next.status === state.status ? '2px solid #4c6fff' : '1px solid #ccc',
              background: next.status === state.status ? '#eef1ff' : '#fff',
              transition: 'all 150ms ease',
            }}
          >
            {next.status}
          </button>
        ))}
      </div>
      <StatusBanner state={state} />
    </main>
  )
}