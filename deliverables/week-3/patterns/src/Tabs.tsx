import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import './Tabs.css'

const tabIdFor = (baseId: string, value: string) => `${baseId}-tab-${value}`
const panelIdFor = (baseId: string, value: string) => `${baseId}-panel-${value}`

// Where the arrow keys land, or null for a key the tablist doesn't handle.
// Both arrows wrap around the ends.
function nextTabIndex(key: string, current: number, last: number): number | null {
  switch (key) {
    case 'ArrowRight':
      return current === last ? 0 : current + 1
    case 'ArrowLeft':
      return current === 0 ? last : current - 1
    case 'Home':
      return 0
    case 'End':
      return last
    default:
      return null
  }
}

// A factory instead of a single module-level export: T only exists at a
// generic call site, never at module-evaluation time, so a single shared
// `createContext` could never be parameterized per <Tabs> usage. Each
// createTabs<T>() call gets its own Context (and its own Tab/Panel closed
// over that same T), so a value that isn't in T is a compile error instead
// of silently typed as `string`.
//
// storageKey is explicit, not derived, for the same reason a queryKey or an
// IndexedDB store name is: whoever creates an instance is the one who knows
// its semantic identity, so they're the one who names it. Nothing here (or
// in TypeScript) can catch two instances picking the same string by
// accident — that's a runtime identity, not something the type system has
// any way to verify is globally unique.
export function createTabs<T extends string = string>(
  storageKey: string,
  validValues?: readonly T[],
) {
  // The active value lives here and nowhere else. Sub-components read it from
  // context, so a consumer composes `Tabs.List` / `Tabs.Tab` / `Tabs.Panel` in
  // any arrangement without threading `active`/`onChange` through the tree.
  // `baseId` rides along so a tab and its panel can derive the same pair of ids
  // and point at each other without the consumer supplying any.
  interface TabsContextValue {
    value: T
    select: (value: T) => void
    baseId: string
    defaultValue: T
    // Which values are actually mounted right now, kept as data instead of
    // read back out of the DOM. Each Tab registers itself on mount; TabsList
    // uses it to tell "no tab matches the active value" from real state.
    knownValues: RefObject<Set<T>>
  }

  const TabsContext = createContext<TabsContextValue | null>(null)

  function useTabsContext(): TabsContextValue {
    const context = useContext(TabsContext)
    if (context === null) {
      throw new Error('Tabs.List, Tabs.Tab and Tabs.Panel must be used within <Tabs>')
    }
    return context
  }

  // `validValues` is optional: the default, unconstrained `Tabs` export below
  // has no fixed set of tab values to check against, and there any non-null
  // stored string genuinely is a valid T. When a caller does supply it, this
  // is what turns the persisted-value read into a real check instead of a
  // blind assertion — the cast lives on `validValues` (an array we already
  // know is `T`-shaped), never on the untrusted string coming out of
  // localStorage.
  function isValidValue(value: string): value is T {
    return validValues === undefined || (validValues as readonly string[]).includes(value)
  }

  interface TabsProps {
    defaultValue: T
    children: ReactNode
  }

  function TabsRoot({ defaultValue, children }: TabsProps) {
    const [value, setValue] = useState<T>(() => {
      try {
        const stored = localStorage.getItem(storageKey)
        return stored !== null && isValidValue(stored) ? stored : defaultValue
      } catch (e) {
        console.error('Tabs: failed to read persisted tab:', e)
        return defaultValue
      }
    })
    const baseId = useId()
    const knownValues = useRef<Set<T>>(new Set())

    useEffect(() => {
      try {
        localStorage.setItem(storageKey, value)
      } catch (e) {
        console.error('Tabs: failed to persist tab:', e)
      }
    }, [value])

    // Not memoized on purpose: the only two things that re-render TabsRoot are
    // a `value` change (which invalidates the memo anyway) and a parent
    // re-render (which hands `children` fresh elements, so the consumers
    // re-render regardless). Nothing here is wrapped in React.memo, so a
    // stable context identity saves zero renders.
    const context: TabsContextValue = {
      value,
      select: setValue,
      baseId,
      defaultValue,
      knownValues,
    }

    return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  }

  interface TabsListProps {
    children: ReactNode
    'aria-label'?: string
  }

  function TabsList({ children, 'aria-label': ariaLabel }: TabsListProps) {
    const { value, defaultValue, select, knownValues } = useTabsContext()
    const listRef = useRef<HTMLDivElement>(null)

    // Only needed when nothing validated the persisted value up front: with
    // `validValues` supplied, `isValidValue` already rejects an orphaned
    // value before first paint (TabsRoot's useState initializer), so `value`
    // can never mismatch a registered tab here — this effect would just be
    // re-confirming a guarantee TabsRoot already made. Without `validValues`
    // (the permissive, string-typed default `Tabs` export), any non-null
    // string is trusted at read time, so a value orphaned by a prior,
    // differently-shaped use of the same storage key can still slip through
    // — this is the fallback net for exactly that case, and only that case.
    // Checked against `knownValues` (data each Tab registered on mount)
    // rather than by reading `aria-selected` back out of the rendered DOM.
    useLayoutEffect(() => {
      if (validValues !== undefined) {
        return
      }
      if (knownValues.current.size > 0 && !knownValues.current.has(value)) {
        select(defaultValue)
      }
    }, [value, defaultValue, select, knownValues])

    // The APG keyboard contract, with manual activation: arrows and Home/End
    // move focus, and the tab is a real button so Enter/Space already activate
    // it. Moving focus without selecting keeps arrowing through the tabs from
    // swapping the panel out from under someone still looking for the one they
    // want. This still reads the DOM rather than `knownValues` above: this
    // needs visual order, which a Set can't give back, only existence.
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      const tabs = Array.from(
        listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
      )
      const current = tabs.findIndex((tab) => tab === document.activeElement)
      if (current === -1) {
        return
      }

      const next = nextTabIndex(event.key, current, tabs.length - 1)
      if (next === null) {
        return
      }

      // Stop Home/End scrolling the page and the arrows moving the caret.
      event.preventDefault()
      tabs[next].focus()
    }

    return (
      <div
        className="tabs__list"
        role="tablist"
        aria-label={ariaLabel}
        ref={listRef}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    )
  }

  interface TabProps {
    value: T
    children: ReactNode
  }

  function Tab({ value, children }: TabProps) {
    const { value: activeValue, select, baseId, knownValues } = useTabsContext()
    const isSelected = value === activeValue

    // Registers this value in TabsRoot's shared set so TabsList's recovery
    // check (above) has real data to compare against instead of the DOM.
    useLayoutEffect(() => {
      const values = knownValues.current
      values.add(value)
      return () => {
        values.delete(value)
      }
    }, [value, knownValues])

    return (
      <button
        className="tabs__tab"
        type="button"
        role="tab"
        id={tabIdFor(baseId, value)}
        // Only the selected tab points at a panel: the other panels are not
        // rendered, so their ids would be dangling references.
        aria-controls={isSelected ? panelIdFor(baseId, value) : undefined}
        aria-selected={isSelected}
        // Roving tabindex: the tablist is one stop, so Tab reaches the selected
        // tab and then moves on to its panel instead of walking every tab.
        tabIndex={isSelected ? 0 : -1}
        onClick={() => select(value)}
      >
        {children}
      </button>
    )
  }

  interface TabsPanelProps {
    value: T
    children: ReactNode
  }

  function TabsPanel({ value, children }: TabsPanelProps) {
    const { value: activeValue, baseId } = useTabsContext()

    // Inactive panels are not rendered at all, so exactly one tabpanel is ever
    // in the accessibility tree.
    if (value !== activeValue) {
      return null
    }

    return (
      <div
        className="tabs__panel"
        role="tabpanel"
        id={panelIdFor(baseId, value)}
        aria-labelledby={tabIdFor(baseId, value)}
        // The panel may hold nothing focusable, so it takes focus itself and
        // Tab from the selected tab lands on the content it describes.
        tabIndex={0}
      >
        {children}
      </div>
    )
  }

  return Object.assign(TabsRoot, {
    List: TabsList,
    Tab,
    Panel: TabsPanel,
  })
}

// The default: identical to every consumer that just does
// `import { Tabs } from './Tabs'` before this factory existed — `value` is
// plain `string`, nothing narrower. `index.tsx` opts into a stricter T of
// its own instead of using this one. Its own storage key, distinct from
// index.tsx's, so the two never fight over the same localStorage slot if
// this one's ever rendered too.
export const Tabs = createTabs<string>('patterns-active-tab-default')
