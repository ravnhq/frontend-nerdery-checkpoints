// A discriminated union: every variant shares the `status` discriminant,
// but carries different data. TypeScript can narrow on `state.status`.
export type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; id: string }
  | { status: "error"; message: string };

// TODO: implement an EXHAUSTIVE switch on `state.status` that returns:
//   idle       -> 'Ready'
//   submitting -> 'Submitting…'
//   success    -> `Saved #${state.id}`
//   error      -> state.message
// Add a `default` branch containing:
//   const _exhaustive: never = state
//   return _exhaustive
// so that adding a new union case fails to COMPILE until you handle it.
export function describeState(state: FormState): string {
  switch (state.status) {
    case "idle":
      return "Ready";
    case "submitting":
      return "Submitting\u2026";
    case "success":
      return `Saved #${state.id}`;
    case "error":
      return state.message;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
