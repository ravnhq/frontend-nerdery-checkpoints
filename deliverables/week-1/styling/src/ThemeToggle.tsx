import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" className="app__toggle" onClick={toggle}>
      Theme: {theme}
    </button>
  )
}
