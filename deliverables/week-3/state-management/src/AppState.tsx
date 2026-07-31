import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { fetchUsers, type User } from './api'

const USERS_QUERY_KEY = ['users']

const SelectedUserContext = React.createContext<{
  selectedId: string | null
  select: (id: string) => void
} | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const value = React.useMemo(
    () => ({ selectedId, select: setSelectedId }),
    [selectedId],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SelectedUserContext.Provider value={value}>
        {children}
      </SelectedUserContext.Provider>
    </QueryClientProvider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  })

  return { users: data ?? [], isLoading }
}

export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const context = React.useContext(SelectedUserContext)
  if (!context) {
    throw new Error('useSelectedUser must be used within an AppStateProvider')
  }
  return context
}
