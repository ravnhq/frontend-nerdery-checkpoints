import { createContext, useContext, useState, type ReactNode } from 'react'


interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be rendered inside a <Tabs> component.')
  }
  return context
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

function Tab({ value, children }: TabProps) {
  const { value: activeValue, setValue } = useTabsContext()
  return (
    <button type="button" role="tab" aria-selected={activeValue === value} onClick={() => setValue(value)}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const { value: activeValue } = useTabsContext()
  if (activeValue !== value) {
    return null
  }
  return <div role="tabpanel">{children}</div>
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
