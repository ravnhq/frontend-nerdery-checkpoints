import { AppStateProvider } from './AppState'
import { UsersScreen } from './UsersScreen'
import { SelectedUserBadge } from './SelectedUserBadge'
// Demo-only styles so the runnable page matches the Week 2 visual treatment.
import './state-management.css'

/**
 * Demo wiring: a single `AppStateProvider` shares the fetched-once user list
 * and the global selection between two sibling components.
 */
export default function Demo() {
  return (
    <main className="state-demo">
      <section className="state-demo__panel" aria-labelledby="state-demo-title">
        <h1 id="state-demo-title">Shared user state</h1>
        <AppStateProvider>
          <SelectedUserBadge />
          <UsersScreen />
        </AppStateProvider>
      </section>
    </main>
  )
}
