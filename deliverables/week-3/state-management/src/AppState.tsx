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

// STUB (breaks sharing): selection lives in local component state, so each
// consumer has its OWN selection and siblings never see each other's choice.
export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  return { selectedId, select: setSelectedId }
}
