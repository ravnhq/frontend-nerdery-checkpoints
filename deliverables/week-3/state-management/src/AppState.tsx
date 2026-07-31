import {
  useState,
  createContext,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import { fetchUsers, type User } from './api'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

export type UserContextValue = {
  selectedId: string | null
  select: (id: string) => void
}
const UserContext = createContext<UserContextValue | null>(null)

export function AppStateProvider({
  children,
}: {
  readonly children: ReactNode
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      selectedId,
      select: (id: string) => setSelectedId(id),
    }),
    [selectedId],
  )

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </QueryClientProvider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean } {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    staleTime: 4000,
  })

  return { users, isLoading }
}

export function useSelectedUser(): UserContextValue {
  const value = useContext(UserContext)
  if (!value) {
    throw new Error('useSelectedUser must be used within a AppStateProvider')
  }
  return value
}
