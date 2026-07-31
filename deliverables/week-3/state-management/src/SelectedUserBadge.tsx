import { useUsers, useSelectedUser } from './AppState'
import styles from './app.module.css'

/**
 * Shows the name of the currently-selected user, e.g. `Selected: Ada`.
 * Reads the global selection from `useSelectedUser` and resolves the name
 * from the shared user list, so it stays in sync with any sibling that
 * changes the selection.
 */
export function SelectedUserBadge() {
  const { users } = useUsers()
  const { selectedId } = useSelectedUser()

  const selected = users.find((user) => user.id === selectedId)

  return (
    <p className={styles.badge} data-empty={selected ? 'false' : 'true'}>
      Selected: {selected ? selected.name : 'none'}
    </p>
  )
}
