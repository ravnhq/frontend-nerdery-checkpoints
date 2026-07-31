import React from 'react'
import { fetchUsers, type User } from './api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

// STUB (breaks dedupe): every component that calls this fires its own
// `fetchUsers`, so N consumers produce N network calls instead of one.
export function useUsers(): { users: User[]; isLoading: boolean } {
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let active = true
    fetchUsers().then((result) => {
      if (!active) return
      setUsers(result)
      setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  return { users, isLoading }
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
