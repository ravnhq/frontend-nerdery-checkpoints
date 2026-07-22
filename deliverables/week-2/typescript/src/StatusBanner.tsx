import type { FormState } from './formState'
import { describeState } from './formState'

// TODO: render describeState(state). When state.status === 'error', wrap the
// text in an element with role="alert" so screen readers announce it.
export function StatusBanner({ state }: { state: FormState }) {
  const text = describeState(state)
  const className = `typescript-demo__status typescript-demo__status--${state.status}`

  if (state.status === 'error') {
    return (
      <div className={className} role="alert">
        <span className="typescript-demo__status-label">Current state</span>
        <strong className="typescript-demo__status-text">{text}</strong>
      </div>
    )
  }

  return (
    <div className={className}>
      <span className="typescript-demo__status-label">Current state</span>
      <strong className="typescript-demo__status-text">{text}</strong>
    </div>
  )
}
