import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    let storedTheme = window.localStorage.getItem('theme')
    return storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : 'light'
  })

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  const value = useMemo(() => {
    function toggle() {
      setTheme(previousTheme =>
        previousTheme === 'light' ? 'dark' : 'light',
      )
    }
    return { theme, toggle }
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (value === null) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }
  return value
}
