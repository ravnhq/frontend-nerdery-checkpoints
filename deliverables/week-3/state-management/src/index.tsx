import { AppStateProvider } from './AppState'
import { UsersScreen } from './UsersScreen'
import { SelectedUserBadge } from './SelectedUserBadge'
import './StateManagement.css'

/**
 * Demo wiring: a single `AppStateProvider` shares the fetched-once user list
 * and the global selection between two sibling components.
 */
export default function Demo() {
  return (
    <AppStateProvider>
      <main className="state-management">
        <section className="state-management__panel" aria-labelledby="team-directory-title">
          <header className="state-management__header">
            <p className="state-management__eyebrow">Workspace</p>
            <h1 id="team-directory-title">Team directory</h1>
            <p className="state-management__subtitle">Choose a teammate to focus your workspace.</p>
          </header>
          <SelectedUserBadge />
          <UsersScreen />
        </section>
      </main>
    </AppStateProvider>
  )
}
