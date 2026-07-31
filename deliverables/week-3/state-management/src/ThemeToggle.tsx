import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" className="crew-demo__toggle" onClick={toggle}>
      Theme: {theme}
    </button>
  )
}
