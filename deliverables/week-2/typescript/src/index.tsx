import type { FormState } from './formState'
import { StatusBanner } from './StatusBanner'
import { useLocalStorageState } from './useLocalStorageState'
import './styles.css'

const STATES: FormState[] = [
  { status: 'idle' },
  { status: 'submitting' },
  { status: 'success', id: '42' },
  { status: 'error', message: 'Something went wrong' },
]

export default function Demo() {
  const [state, setState] = useLocalStorageState<FormState>("status:", STATES[0])

  return (
    <main className="form-status">
      <h1 className="form-status__title">Form status</h1>
      <div className="form-status__buttons">
        {STATES.map((next) => (
          <button
            className="form-status__button"
            key={next.status}
            aria-pressed={next.status === state.status}
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
