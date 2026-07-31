import type { FormState } from './formState'
import { describeState } from './formState'

export function StatusBanner({ state }: { state: FormState }) {
  return <div role={state.status === 'error' ? 'alert' : undefined}>{describeState(state)}</div>
}
