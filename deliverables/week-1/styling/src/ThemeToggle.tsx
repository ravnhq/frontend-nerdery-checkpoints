import { useTheme } from './ThemeProvider'

export function ThemeToggle() {

  const { theme, toggle } = useTheme()

  return (
    <button onClick={toggle}>
      Theme: {theme}
    </button>
  )
}
