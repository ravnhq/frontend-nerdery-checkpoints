import type { FormState } from './formState'
import { describeState } from './formState'

export function StatusBanner({ state }: { state: FormState }) {
  if (state.status === 'error') {
    return <div role="alert">{describeState(state)}</div>
  }
  return <div>{describeState(state)}</div>
}
