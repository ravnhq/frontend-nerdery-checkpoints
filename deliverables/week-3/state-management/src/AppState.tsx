import React, { createContext } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { fetchUsers, type User } from './api'

export interface AppState {
  selectedId: string | null
  select: (id: string) => void
}

const AppStateContext = createContext<AppState | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const value: AppState = {
    selectedId,
    select: setSelectedId,
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppStateContext.Provider value={value}>
        {children}
      </AppStateContext.Provider>
    </QueryClientProvider>
  )
}

function useAppState(): AppState {
  const value = React.useContext(AppStateContext)

  if (!value) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }

  return value
}
export function useUsers(): { users: User[]; isLoading: boolean } {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity,
  })

  return { users, isLoading }
}

export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const { selectedId, select } = useAppState()

  return { selectedId, select }
}
