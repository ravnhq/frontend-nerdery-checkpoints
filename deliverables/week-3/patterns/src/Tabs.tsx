import { createContext, useContext, useState, type ReactNode } from 'react'

function useTabsContext():TabsContextValue
{
  const context = useContext(TabsContext);
  if(!context)
  {
    throw new Error("Tabs.* components must be rendered within <Tabs>")
  }
  return context
}

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

function Tab({ value, children }: TabProps) {
  const {value:currentValue, setValue} = useTabsContext();
  return (
    <button type="button" role="tab" aria-selected={currentValue===value} onClick={()=>setValue(value)}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const {value:currentValue} = useTabsContext();
  if(value===currentValue)
  {
    return <div role="tabpanel">{children}</div> 
  }
  else return null
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
