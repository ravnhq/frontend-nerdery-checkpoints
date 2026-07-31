import { useUsers, useSelectedUser } from './AppState'
import styles from './app.module.css'

/**
 * Lists the users returned by `useUsers`. Each user has a button whose
 * accessible name is the user's name; clicking it sets the global selection.
 */
export function UsersScreen() {
  const { users, isLoading } = useUsers()
  const { select } = useSelectedUser()

  if (isLoading) {
    return <p className={styles.loading}>Loading users…</p>
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" className={styles.userButton} onClick={() => select(user.id)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
