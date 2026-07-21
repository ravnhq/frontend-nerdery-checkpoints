import type { FormState } from './formState'
import { describeState } from './formState'

type StatusBannerProps = {
  state: FormState
}

export function StatusBanner({ state }: StatusBannerProps) {
  const text = describeState(state);

  if (state.status === 'error') {
    return <div role="alert">{text}</div>;
  }

  return <div>{text}</div>;
}