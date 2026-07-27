import { createContext, useState, useContext, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// STUB IMPLEMENTATION
// Renders the sub-components flat with the correct roles so tests fail on the
// behavioural assertions (one visible panel, aria-selected, switching) rather
// than on import errors. Replace with the reference solution.
// ---------------------------------------------------------------------------

// esto es el patron compound components, basicamente cada parte del tab es un componente separado
// pero comparten estado a traves de un context interno

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

// el context arranca en null para poder detectar si lo usas sin el provider
const TabsContext = createContext<TabsContextValue | null>(null)

// hook interno que valida que estes dentro del provider, si no tira error
function useTabsContext() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
  return ctx
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

// el componente raiz que guarda cual tab esta activo y lo comparte via context
function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

// contenedor de las pestanas, el role="tablist" es para accesibilidad
function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}

// cada tab individual, lee del context cual es el activo y se marca con aria-selected
function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { value: active, setValue } = useTabsContext()
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active === value}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  )
}

// solo renderiza el contenido si este panel es el tab activo
function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const { value: active } = useTabsContext()
  if (active !== value) return null
  return <div role="tabpanel">{children}</div>
}

// con Object.assign junto todo en un solo export: Tabs.List, Tabs.Tab, Tabs.Panel
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})
