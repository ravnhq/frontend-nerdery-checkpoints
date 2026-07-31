import { useLocalStorageState } from './useLocalStorageState'
import type { FormState } from './formState'
import { StatusBanner } from './StatusBanner'

// Runnable demo shown in the dev server: cycle through every FormState variant
// and see how StatusBanner reacts.
const STATES: FormState[] = [
  { status: 'idle' },
  { status: 'submitting' },
  { status: 'success', id: '42' },
  { status: 'error', message: 'Something went wrong' },
]

export default function Demo() {
  const [state, setState] = useLocalStorageState<FormState>('demo', STATES[0])

  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '1rem auto', padding: '0 1rem' }}>
      <h1>Form status</h1>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {STATES.map((next) => (
          <button key={next.status} onClick={() => setState(next)}>
            {next.status}
          </button>
        ))}
      </div>
      <StatusBanner state={state} />
    </main>
  )
}
