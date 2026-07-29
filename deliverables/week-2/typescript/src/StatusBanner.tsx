import type { FormState } from './formState'
import { describeState } from './formState'
import './StatusBanner.css'

export function StatusBanner({ state }: { readonly state: FormState }) {
  if (state.status !== 'error') {
    return <div className="ts-status-banner">{describeState(state)}</div>
  }
  return (
    <div className="ts-error-container">
      <span className="ts-error-banner" role="alert">
        {state.message}
      </span>
    </div>
  )
}
