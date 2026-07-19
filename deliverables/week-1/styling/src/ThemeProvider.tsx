import { createContext, useContext, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

// TODO: hold theme in state (default 'light', hydrate from localStorage 'theme'),
// persist on change, and set document.documentElement.dataset.theme via an effect.
export function ThemeProvider({ children }: { children: ReactNode }) {

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('theme')
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  const toggle = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// TODO: throw when used outside a ThemeProvider.
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  return value ?? { theme: 'light', toggle: () => undefined }
}
