import { useTheme } from './ThemeProvider'

// TODO: render a button whose accessible name includes the current theme
// (e.g. "Theme: light" / "Theme: dark") and calls toggle on click.
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return <button type="button" onClick={toggle}>Theme: {theme}</button>
}
