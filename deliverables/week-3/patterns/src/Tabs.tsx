import { createContext, useContext, useState, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// STUB IMPLEMENTATION
// Renders the sub-components flat with the correct roles so tests fail on the
// behavioural assertions (one visible panel, aria-selected, switching) rather
// than on import errors. Replace with the reference solution.
// ---------------------------------------------------------------------------

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: ReactNode
}

function TabsList({ children }: TabsListProps) {
  return <div role="tablist">{children}</div>
}

interface TabProps {
  value: string
  children: ReactNode
}

// A prop-driven `Tabs` (`<Tabs active="a" onChange={...} tabs={[{value, label, panel}]} />`)
// would force the consumer to build the whole tab list as a fixed data shape up front,
// and to manage the active value/setter themselves.

// The compound + Context approach instead lets each `Tabs.Tab`/`Tabs.Panel` communicate
// through one shared `value` — no matter how many tabs exist (10 or 100), the pattern
// scales the same way, and nothing gets prop-drilled from `Tabs.List` down to each child.

// The cost: the pieces only work together. A `Tabs.Tab` rendered outside `<Tabs>` throws
// immediately, and the data flow isn't obvious just from reading a consumer's JSX — you
// have to know a Context exists underneath to understand how the active tab gets shared.

// For a composition-first, reusable widget like this, the ergonomics win. For a simple,
// one-off list built from data already in a fixed shape, the prop-driven form would be
// the more explicit, easier-to-trace choice.
function Tab({ value: valueTab, children }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  const { value, setValue } = context
  return (
    <button type="button" role="tab" aria-selected={valueTab === value} onClick={() => setValue(valueTab)}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value: valuePanel, children }: TabsPanelProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')
  const { value } = context
  return valuePanel === value ? <div role="tabpanel">{children}</div> : null
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
