import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  return stored === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return value
}
