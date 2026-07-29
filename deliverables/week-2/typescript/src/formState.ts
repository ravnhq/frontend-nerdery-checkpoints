export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; id: string }
  | { status: 'error'; message: string }

export function describeState(state: FormState): string {
  switch (state.status) {
    case 'idle':
      return 'Ready'
    case 'submitting':
      return 'Submitting…'
    case 'success':
      return `Saved #${state.id}`
    case 'error':
      return state.message
    default: {
      const _e: never = state
      return _e
    }
  }
}
