import type { FormState } from './formState'
import { describeState } from './formState'
// TODO: render describeState(state). When state.status === 'error', wrap the
// text in an element with role="alert" so screen readers announce it.
export function StatusBanner({ state }: { state: FormState }) {
  const text = describeState(state)
  if (state.status === 'error') {
    return <p role="alert">{text}</p>
  }
  return <div>{text}</div>
}
