import {
  createContext,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (context === null) throw new Error('useTabsContext must be used within <Tabs>. ' +
                                        'Wrap Tabs.List / Tabs.Tab / Tabs.Panel in a <Tabs> element.')
  return context
}

const tabId = (baseId: string, value: string): string => `${baseId}-tab-${value}`
const panelId = (baseId: string, value: string): string => `${baseId}-panel-${value}`

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  const baseId = useId()

  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      {children}
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

function TabsList({ children, className }: TabsListProps) {
  return (
    <div role="tablist" className={className}>
      {children}
    </div>
  )
}

interface TabProps {
  value: string
  children: ReactNode
  className?: string
}

const MOVEMENT_KEYS = ['ArrowRight', 'ArrowLeft', 'Home', 'End']

function Tab({ value, children, className }: TabProps) {
  const { value: currentValue, setValue, baseId } = useTabsContext()
  const activeTab = currentValue === value

  const handleClick = () => setValue(value)

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!MOVEMENT_KEYS.includes(event.key)) return

    const tablist = event.currentTarget.closest('[role="tablist"]')
    if (tablist === null) return

    const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const index = tabs.indexOf(event.currentTarget)
    if (index === -1) return

    const lastIndex = tabs.length - 1
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex

    const nextTab = tabs[nextIndex]
    const nextValue = nextTab.dataset.value
    if (nextValue === undefined) return

    event.preventDefault()
    nextTab.focus()
    setValue(nextValue)
  }

  return (
    <button
      type="button"
      role="tab"
      id={tabId(baseId, value)}
      aria-selected={activeTab}
      aria-controls={activeTab ? panelId(baseId, value) : undefined}
      tabIndex={activeTab ? 0 : -1}
      data-value={value}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
  className?: string
}

function TabsPanel({ value, children, className }: TabsPanelProps) {
  const { value: currentValue, baseId } = useTabsContext()
  if (currentValue !== value) return null

  return (
    <div
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  )
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
