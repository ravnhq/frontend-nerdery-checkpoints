// A discriminated union: every variant shares the `status` discriminant,
// but carries different data. TypeScript can narrow on `state.status`.
export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; id: string }
  | { status: 'error'; message: string }

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`)
}

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
      return assertNever(state)
    }
  }
}
