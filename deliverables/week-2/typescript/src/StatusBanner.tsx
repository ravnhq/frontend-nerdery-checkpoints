import type { FormState } from './formState'
import { describeState } from './formState'
import './StatusBanner.css'

export function StatusBanner({ state }: { state: FormState }) {
  const message = describeState(state)

  if (state.status === 'error') {
    return (
      <div role="alert" className="status-banner" data-status={state.status}>
        {message}
      </div>
    )
  }

  return (
    <div className="status-banner" data-status={state.status}>
      {message}
    </div>
  )
}
