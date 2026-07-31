import { AppStateProvider } from './AppState'
import { UsersScreen } from './UsersScreen'
import { SelectedUserBadge } from './SelectedUserBadge'
import styles from './app.module.css'

/**
 * Demo wiring: a single `AppStateProvider` shares the fetched-once user list
 * and the global selection between two sibling components.
 */
export default function Demo() {
  return (
    <AppStateProvider>
      <div className={styles.demo}>
        <h1 className={styles.title}>Users</h1>
        <SelectedUserBadge />
        <UsersScreen />
      </div>
    </AppStateProvider>
  )
}
