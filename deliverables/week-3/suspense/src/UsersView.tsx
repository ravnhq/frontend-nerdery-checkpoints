import { Component, Suspense, use, useState, type ErrorInfo, type ReactNode } from 'react'
import { fetchUsers, type User } from './api'

interface ErrorBoundaryProps {
  fallback: (retry: () => void) => ReactNode
  retry: () => void
  children: ReactNode
  resetKey: number
}

interface ErrorBoundaryState {
  hasError: boolean
}

// Class component required by React to catch render errors from its children.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  // Switches the boundary into fallback mode when a child throws.
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UsersView error boundary:', error, info)
  }

  // A changed reset key means the user asked to retry, so the boundary can render children again.
  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.props.retry)
    }

    return this.props.children
  }
}

// Module-level promise cache keeps Suspense from refetching on every render.
let cachedPromise: Promise<User[]> | null = null

function getUsers(): Promise<User[]> {
  if (!cachedPromise) {
    cachedPromise = fetchUsers()
  }

  return cachedPromise
}

function clearUsersCache() {
  cachedPromise = null
}

function UserList() {
  // React suspends this component while the cached promise is pending.
  const users = use(getUsers())

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export function UsersView() {
  // Incrementing this value gives the ErrorBoundary a retry signal.
  const [resetKey, setResetKey] = useState(0)

  function handleRetry() {
    // Clear the failed promise before resetting the boundary so the next render refetches.
    clearUsersCache()
    setResetKey((key) => key + 1)
  }

  return (
    <ErrorBoundary
      resetKey={resetKey}
      retry={handleRetry}
      fallback={(retry) => (
        <div>
          <p>Something went wrong</p>
          <button type="button" onClick={retry}>
            Try again
          </button>
        </div>
      )}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  )
}
