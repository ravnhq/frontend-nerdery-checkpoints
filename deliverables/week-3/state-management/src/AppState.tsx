import React from 'react'
import { fetchUsers, type User } from './api'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

interface SelectionContextValue {
  selectedId: string | null
  select: (id: string) => void
}
const SelectionContext = React.createContext<SelectionContextValue | null>(null)

const queryClient = new QueryClient()

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <SelectionContext.Provider
        value={{ selectedId, select: setSelectedId }}
      >
        {children}
      </SelectionContext.Provider>
    </QueryClientProvider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
  return { users: data ?? [], isLoading }
}

export function useSelectedUser(): SelectionContextValue {
  const context = React.useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectionContext.Provider')
  }
  return context
}