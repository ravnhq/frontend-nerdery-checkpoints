export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; id: string }
  | { status: 'error'; message: string }

export function describeState(_state: FormState): string {
  switch(_state.status) {
    case  "idle":
      return "Ready";
    case "submitting":
      return "Submitting…";
    case "success":
      return `Saved #${_state.id}`;
    case "error":
      return _state.message;
    default:
    {
      const _exhaustive: never = _state;
      return _exhaustive;
    }
  }
}
