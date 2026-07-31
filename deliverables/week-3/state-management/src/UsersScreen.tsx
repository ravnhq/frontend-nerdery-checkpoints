import { useUsers, useSelectedUser } from './AppState'
import './UsersScreen.css'

/**
 * Lists the users returned by `useUsers`. Each user has a button whose
 * accessible name is the user's name; clicking it sets the global selection.
 */
export function UsersScreen() {
  const { users, isLoading } = useUsers()
  const { selectedId, select } = useSelectedUser()

  if (isLoading) {
    return (
      <p className="crew__loading" role="status">
        Loading users…
      </p>
    )
  }

  return (
    <ul className="crew__list">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            className="crew__user"
            aria-pressed={user.id === selectedId}
            onClick={() => select(user.id)}
          >
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
