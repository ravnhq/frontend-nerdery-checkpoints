import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { fetchUsers, type User } from './api'

/**
 * Server state and UI state are kept apart on purpose: the fetched users are
 * cached and deduped by TanStack Query, while the selection (below) is plain
 * UI state in a context.
 *
 * Created once at module scope, not per AppStateProvider mount: the whole
 * point of caching is that it survives a consumer unmounting and
 * remounting - including the provider itself remounting when this demo's
 * route is navigated away from and back to. A queryClient created inside
 * the component (e.g. via `useState`) would throw the cache away on exactly
 * that navigation, which defeats the "reused across navigation" contract.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The list never goes stale on its own, so a consumer that unmounts
      // and comes back reads the cache instead of firing a second request.
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

interface SelectionApi {
  selectedId: string | null
  select: (id: string) => void
}

const SelectionContext = createContext<SelectionApi | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  // The one and only selection. It lives here, above both consumers, which is
  // what lets a sibling see a choice made somewhere else in the tree. Unlike
  // queryClient above, this is meant to reset on remount - it's per-visit UI
  // state, not data worth persisting across navigation.
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Not memoized on purpose: the only two things that re-render
  // AppStateProvider are a `selectedId` change (which invalidates the memo
  // anyway) and a parent re-render (which hands it fresh `children`, so the
  // consumers re-render on element identity regardless). Nothing here is
  // wrapped in React.memo, so a stable context identity saves zero renders.
  const selection: SelectionApi = { selectedId, select: setSelectedId }

  return (
    <QueryClientProvider client={queryClient}>
      <SelectionContext.Provider value={selection}>{children}</SelectionContext.Provider>
    </QueryClientProvider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean } {
  // Every caller asks for the same key, so the first one starts the request
  // and the rest join it. N consumers, one fetch.
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

  return { users: data ?? [], isLoading }
}

export function useSelectedUser(): SelectionApi {
  const selection = useContext(SelectionContext)
  if (selection === null) {
    throw new Error('useSelectedUser must be used within an AppStateProvider')
  }
  return selection
}
