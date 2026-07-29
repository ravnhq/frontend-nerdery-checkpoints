import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import './Tabs.css'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  readonly defaultValue: string
  readonly children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  )

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  )
}
export function useTabs(): TabsContextValue {
  const value = useContext(TabsContext)
  if (!value) {
    throw new Error('useTabs must be used within a TabsRoot')
  }
  return value
}

interface TabsListProps {
  readonly children: ReactNode
}

function TabsList({ children }: TabsListProps) {
  return (
    <div role="tablist" className="tabs-list">
      {children}
    </div>
  )
}

interface TabProps {
  readonly value: string
  readonly children: ReactNode
}

function Tab({ value, children }: TabProps) {
  const currentTab = useTabs()
  return (
    <button
      type="button"
      role="tab"
      aria-selected={currentTab.value === value}
      className="tab"
      onClick={() => {
        if (currentTab.value !== value) {
          currentTab.setValue(value)
        }
      }}
    >
      {children}
    </button>
  )
}

interface TabsPanelProps {
  readonly value: string
  readonly children: ReactNode
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const currentTab = useTabs()
  if (currentTab.value === value) {
    return <div role="tabpanel">{children}</div>
  }
  return null
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
