import React, { useContext, useState } from 'react'
import { fetchUsers, type User } from './api'
import {QueryClientProvider , QueryClient, useQuery} from '@tanstack/react-query'


type SelectionContextValue  = {
  selectedId: string | null
  select: (id: string) => void
}

const SelectionContext = React.createContext<SelectionContextValue | undefined>(undefined)

const time = 1000 * 60 * 5 

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  
  const [queryClient] = useState(() => new QueryClient())
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectionValue: SelectionContextValue = {
    selectedId,
    select: setSelectedId
  }

  return ( 
    <QueryClientProvider client={queryClient}>
      <SelectionContext.Provider value={selectionValue}>
        {children}
      </SelectionContext.Provider>
    </QueryClientProvider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean; } {
   const {data , isLoading} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: time,
   })
   return { users: data ?? [], isLoading }
}

export function useSelectedUser(): SelectionContextValue {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelectedUser must be used within a AppStateProvider')
  }
  return context
}
