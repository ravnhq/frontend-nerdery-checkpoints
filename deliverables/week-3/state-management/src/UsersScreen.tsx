import { useUsers, useSelectedUser } from './AppState'
import './UsersScreen.css'

/**
 * Lists the users returned by `useUsers`. Each user has a button whose
 * accessible name is the user's name; clicking it sets the global selection.
 */
export function UsersScreen() {
  const { users, isLoading } = useUsers()
  const { select } = useSelectedUser()

  if (isLoading) {
    return <p>Loading users…</p>
  }

  return (
    <ul className="usersList">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={() => select(user.id)}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
