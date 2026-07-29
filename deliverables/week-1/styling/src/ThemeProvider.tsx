import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'
export type ThemeContextValue = { theme: Theme; toggle: () => void }

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme | null) ?? 'light',
  )

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement
    root.dataset.theme = theme
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return value
}
