import { useUsers, useSelectedUser } from './AppState'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Shows the name of the currently-selected user, e.g. `Selected: Ada`.
 * Reads the global selection from `useSelectedUser` and resolves the name
 * from the shared user list, so it stays in sync with any sibling that
 * changes the selection.
 */
export function SelectedUserBadge() {
  const { users } = useUsers()
  const { selectedId } = useSelectedUser()
  const shouldReduceMotion = useReducedMotion()

  const selected = users.find((user) => user.id === selectedId)
  const selectedName = selected ? selected.name : 'none'

  return (
    <motion.p
      className="state-management__badge"
      key={selectedName}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 20 }}
    >
      <span className="state-management__badge-dot" aria-hidden="true" />
      Selected: {selectedName}
    </motion.p>
  )
}
