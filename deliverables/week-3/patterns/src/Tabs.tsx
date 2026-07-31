import { createContext, useContext, useState, useId, useMemo, type KeyboardEvent, type ReactNode } from 'react'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  keepPanelsMounted: boolean
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps {
  defaultValue: string
  children: ReactNode
  keepPanelsMounted?: boolean
}

function TabsRoot({ defaultValue, children, keepPanelsMounted = false,}: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  const baseId = useId()

  const contextValue = useMemo(
    () => ({ value, setValue, keepPanelsMounted, baseId }),
    [value, keepPanelsMounted, baseId],
  )
  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  )
}

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if(context === null) {
    throw new Error('Tabs components must be inside <Tabs>.')
  }
  return context
}

interface TabsListProps {
  children: ReactNode
}

function TabsList({ children }: TabsListProps) {
  useTabsContext()
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    )

    const currentIndex = tabs.indexOf(
      document.activeElement as HTMLButtonElement,
    )

    if (currentIndex === -1) {
      return
    }

    let nextIndex: number

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length
        break
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    tabs[nextIndex].focus()
  }
  return <div role="tablist" aria-label="Content sections" onKeyDown={handleKeyDown}>{children}</div>
}

interface TabProps {
  value: string
  children: ReactNode
}

function Tab({ value, children }: TabProps) {
  const { value: activeValue, setValue, keepPanelsMounted, baseId } = useTabsContext()
  const isActive = value === activeValue
  const tabId = `${baseId}-tab-${value}`
  const panelId = `${baseId}-panel-${value}`

  function handleClick() {
    setValue(value)
  }

  return (
    <button id={tabId} type="button" role="tab" aria-selected={isActive} aria-controls={keepPanelsMounted ? panelId : undefined} tabIndex={isActive ? 0 : -1} onClick={handleClick}>
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
}

function TabsPanel({ value, children }: TabsPanelProps) {
  const { value: activeValue, keepPanelsMounted, baseId } = useTabsContext()
  const isActive = value === activeValue
  const tabId = `${baseId}-tab-${value}`
  const panelId = `${baseId}-panel-${value}`
  
  if (!isActive && !keepPanelsMounted) {
    return null
  }
  return <div id={panelId} role="tabpanel" aria-labelledby={tabId} hidden={!isActive}>{children}</div>
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
