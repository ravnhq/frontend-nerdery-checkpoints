import { createContext, useContext, useState, type ReactNode } from 'react'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext)
  if (context === null) {
    throw new Error(`${component} must be rendered inside <Tabs>`)
  }
  return context
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value] = useState(defaultValue)
  // STUB: activation is not wired up yet.
  const setValue = (_next: string): void => {}
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

function Tab({ value: _value, children }: TabProps) {
  // STUB: never selected, click does nothing.
  return (
    <button type="button" role="tab" aria-selected={false}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value: _value, children }: TabsPanelProps) {
  // STUB: every panel is always rendered.
  return <div role="tabpanel">{children}</div>
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
