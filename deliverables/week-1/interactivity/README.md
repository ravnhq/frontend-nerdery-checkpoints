# W1 · Interactivity — Hooks & Effects

Practice the interactive side of React: custom hooks, `useEffect` with proper
cleanup, `useRef`, `useId`, and persisting state. You'll build a debounce hook,
a `localStorage`-backed state hook, and a small auto-focusing debounced search UI.

## Requirements

Implement the files in `src/` so the exports below behave as described.

| File | Export | Must do |
|---|---|---|
| `src/useDebouncedValue.ts` | `useDebouncedValue<T>(value: T, delayMs: number): T` | Return `value`, but only update the returned value `delayMs` ms **after** `value` stops changing. Use `setTimeout` inside a `useEffect` and **clear the timeout in the effect cleanup** so rapid changes reset the timer. |
| `src/useLocalStorageState.ts` | `useLocalStorageState<T>(key, initialValue): [T, (value: T \| ((prev: T) => T)) => void]` | Initialize from `localStorage[key]` (JSON-parsed) when present, else from `initialValue`. Write JSON to `localStorage` on every change. |
| `src/DebouncedSearch.tsx` | `DebouncedSearch()` | Text input labelled **"Search"** (associate the label using `useId`), auto-focused on mount (`useRef` + focus in an effect). Display the **debounced** query as text `Searching: {debounced}` using `useDebouncedValue` with **300ms**. |
| `src/LocalStorageDemo.tsx` | `LocalStorageDemo()` | Visual demo of `useLocalStorageState`: a **counter** (with -1, +1, Reset buttons) and a **name input** that greets the user. Both values persist across page reloads. |
| `src/index.tsx` | `default Demo()` | Render `DebouncedSearch` and `LocalStorageDemo` under an `<h1>` for the dev server. |

## Success criteria (automated)

Run `npx vitest run deliverables/week-1/interactivity`. All tests green:

- **`useDebouncedValue`** — with fake timers, after the source value changes the
  hook still returns the **old** value immediately; after advancing 300ms it
  returns the **new** value.
- **`useLocalStorageState` (persist)** — calling the setter writes the new value
  (JSON) to `localStorage[key]`.
- **`useLocalStorageState` (hydrate)** — a value preloaded into `localStorage`
  before mount becomes the hook's initial state.
- **`DebouncedSearch` (focus)** — the search input has focus on mount.
- **`DebouncedSearch` (label)** — `getByLabelText(/search/i)` resolves to the input.

## Also reviewed (see `CHECKLIST.md`)

Effect cleanup correctness, no `exhaustive-deps` suppressions, and a
lift-vs-colocate note — checked by the mentor.

## Lift vs. colocate note

State here is deliberately **colocated**: `query` lives inside `DebouncedSearch`
because nothing outside the component reads or writes it. Lift state to a parent
only when a sibling needs it too; lifting the search query now would add
indirection with no consumer. The reusable behaviour (debouncing, persistence)
is extracted into hooks instead of lifting state — that's the right unit of reuse.
