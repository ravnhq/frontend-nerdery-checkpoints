import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const currentTheme = useTheme()
  return (
    <button type="button" onClick={currentTheme.toggle}>
      Theme: {currentTheme.theme}
    </button>
  )
}
