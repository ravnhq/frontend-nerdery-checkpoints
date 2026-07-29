import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fetchUsers, type User } from './api'

interface UsersState {
  users: User[]
  isLoading: boolean
}

interface SelectionState {
  selectedId: string | null
  select: (id: string) => void
}

const UsersContext = createContext<UsersState | null>(null)
const SelectionContext = createContext<SelectionState | null>(null)

let cachedUsers: User[] | null = null
let usersRequest: Promise<User[]> | null = null

// Keeps the user request shared across every consumer and provider remount.
function loadUsers() {
  if (cachedUsers) {
    return Promise.resolve(cachedUsers)
  }

  if (!usersRequest) {
    usersRequest = fetchUsers()
      .then((result) => {
        cachedUsers = result
        return result
      })
      .finally(() => {
        usersRequest = null
      })
  }

  return usersRequest
}

// Centralizes the user list and the selected user so siblings share one state.
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => cachedUsers ?? [])
  const [isLoading, setIsLoading] = useState(() => cachedUsers === null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    loadUsers().then((result) => {
      if (active) {
        setUsers(result)
        setIsLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const usersValue = useMemo(() => ({ users, isLoading }), [users, isLoading])
  const selectionValue = useMemo(
    () => ({ selectedId, select: setSelectedId }),
    [selectedId],
  )

  return (
    <UsersContext.Provider value={usersValue}>
      <SelectionContext.Provider value={selectionValue}>
        {children}
      </SelectionContext.Provider>
    </UsersContext.Provider>
  )
}

// Fails fast when a consumer is rendered outside AppStateProvider.
export function useUsers(): { users: User[]; isLoading: boolean } {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within AppStateProvider')
  }
  return context
}

// Exposes the shared selected user id and the single action that changes it.
export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelectedUser must be used within AppStateProvider')
  }
  return context
}
