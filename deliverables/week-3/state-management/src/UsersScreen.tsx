import { ThinkingOrb } from 'thinking-orbs'
import { useUsers, useSelectedUser } from './AppState'

/**
 * Lists the users returned by `useUsers`. Each user has a button whose
 * accessible name is the user's name; clicking it sets the global selection.
 */
export function UsersScreen() {
  const { users, isLoading } = useUsers()
  const { select, selectedId } = useSelectedUser()

  if (isLoading) {
    return (
      <div className="state-management__loading">
        <ThinkingOrb className="state-management__orb" state="connecting" size={64} theme="dark" aria-label="Loading users" />
        <p>Loading users...</p>
      </div>
    )
  }

  return (
    <ul className="state-management__users" aria-label="Team members">
      {users.map((user) => (
        <li key={user.id}>
          <button
            className={selectedId === user.id ? 'state-management__user-button state-management__user-button--selected' : 'state-management__user-button'}
            type="button"
            aria-pressed={selectedId === user.id}
            onClick={() => select(user.id)}
          >
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
