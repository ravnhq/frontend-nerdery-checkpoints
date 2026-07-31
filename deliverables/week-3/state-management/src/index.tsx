import { AppStateProvider } from './AppState'
import { UsersScreen } from './UsersScreen'
import { SelectedUserBadge } from './SelectedUserBadge'
import './index.css'

/**
 * Demo wiring: a single `AppStateProvider` shares the fetched-once user list
 * and the global selection between two sibling components.
 */
export default function Demo() {
  return (
    <main
      style={{
        fontFamily: 'system-ui',
        maxWidth: 640,
        margin: '1rem auto',
        padding: '0 1rem',
      }}
    >
      <h1 className="state-title">State management</h1>
      <AppStateProvider>
        <SelectedUserBadge />
        <UsersScreen />
      </AppStateProvider>
    </main>
  )
}
