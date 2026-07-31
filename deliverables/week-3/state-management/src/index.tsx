import { AppStateProvider } from './AppState'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import { UsersScreen } from './UsersScreen'
import { SelectedUserBadge } from './SelectedUserBadge'
import './index.css'

/**
 * Demo wiring: a single `AppStateProvider` shares the fetched-once user list
 * and the global selection between two sibling components.
 */
export default function Demo() {
  return (
    <ThemeProvider>
      <AppStateProvider>
        <div className="crew-demo">
          <div className="crew-demo__inner">
            <header className="crew-demo__masthead">
              <h1 className="crew-demo__title">Crew</h1>
              <ThemeToggle />
            </header>
            <SelectedUserBadge />
            <UsersScreen />
          </div>
        </div>
      </AppStateProvider>
    </ThemeProvider>
  )
}
