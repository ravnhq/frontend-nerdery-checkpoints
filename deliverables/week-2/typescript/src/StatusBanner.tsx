import type { FormState } from './formState'
import { describeState } from './formState'

export function StatusBanner({ state }: { state: FormState }) {
  const message = describeState(state)

  if (state.status === 'error') {
    return <div role="alert">{message}</div>;
  }
  return <div>{message}</div>;
}
