import React from 'react'
import { createContext, useState, useContext } from 'react'
import { fetchUsers, type User } from './api'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

type SelectedUserContextValue = { selectedId: string | null; select: (id: string) => void }
const context = createContext<SelectedUserContextValue | null>(null)
/**
 * STUB — intentionally wrong so the acceptance tests fail (RED).
 *
 * Replace this file with a real implementation:
 *  - `useUsers` must fetch ONCE and share/dedupe the result across every
 *    component under `AppStateProvider` (no duplicate in-flight requests).
 *  - `useSelectedUser` must expose a SINGLE, globally-shared selection so
 *    that sibling components read and write the same value.
 */

// STUB: provider does nothing but render children — no shared cache, no
// shared selection.
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [queryClient] = useState(() => new QueryClient())
  return <context.Provider value={{ selectedId, select: setSelectedId }}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </context.Provider >
}

// STUB (breaks dedupe): every component that calls this fires its own
// `fetchUsers`, so N consumers produce N network calls instead of one.
export function useUsers(): { users: User[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers, staleTime: 300000 })
  return { users: data ?? [], isLoading }
}

// STUB (breaks sharing): selection lives in local component state, so each
// consumer has its OWN selection and siblings never see each other's choice.
export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const ctx = useContext(context)
  if (ctx === null) throw Error('must be within AppState Provider')
  return ctx
}
