import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" className="roster-demo__toggle" onClick={toggle}>
      Theme: {theme}
    </button>
  )
}
