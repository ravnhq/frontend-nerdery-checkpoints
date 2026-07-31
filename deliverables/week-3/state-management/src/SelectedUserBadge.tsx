import { useUsers, useSelectedUser } from './AppState'
import './SelectedUserBadge.css'

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
    <p className="crew__badge" role="status">
      Selected: {selected ? selected.name : 'none'}
    </p>
  )
}
