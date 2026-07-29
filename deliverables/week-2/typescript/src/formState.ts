// A discriminated union: every variant shares the `status` discriminant,
// but carries different data. TypeScript can narrow on `state.status`.
export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; id: string }
  | { status: 'error'; message: string }

// TODO: implement an EXHAUSTIVE switch on `state.status` that returns:
//   idle       -> 'Ready'
//   submitting -> 'Submitting…'
//   success    -> `Saved #${state.id}`
//   error      -> state.message
// Add a `default` branch containing:
//   const _exhaustive: never = state
//   return _exhaustive
// so that adding a new union case fails to COMPILE until you handle it.
export function describeState(_state: FormState): string {

  switch (_state.status) {
    case "idle": return "Ready"
    case "submitting": return "Submitting… "
    case "success": return `Saved #${_state.id}`
    case "error": return _state.message
    default: {
      const _exhaustive: never = _state
      return _exhaustive
    }
  }
}
