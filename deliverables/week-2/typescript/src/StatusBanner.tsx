import type { FormState } from './formState'
import { describeState } from './formState'

export function StatusBanner({ state }: { state: FormState }) {
  if (state.status === 'error') {
    return (
      <div role="alert" className="form-status__banner form-status__banner--error">
        {describeState(state)}
      </div>
    );
  }
  return <div className="form-status__banner">{describeState(state)}</div>
}
