import { Component, Suspense, use, useState, type ReactNode } from 'react'
import { fetchUsers, type User } from './api'

let usersPromise: Promise<User[]> | null = null

function getUsersPromise(): Promise<User[]> {
  if (!usersPromise) {
    usersPromise = fetchUsers()
  }
  return usersPromise
}

function clearUsersCache() {
  usersPromise = null
}

interface ErrorBoundaryProps {
  children?: ReactNode
  FallbackComponent: (props: { error: Error; reset: () => void }) => ReactNode
  onReset: () => void
}

interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  reset = () => {
    this.setState({ error: null })
    this.props.onReset()
  }

  render() {
    if (this.state.error) {
      const { FallbackComponent } = this.props
      return <FallbackComponent error={this.state.error} reset={this.reset} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

function UsersList() {
  const users = use(getUsersPromise())
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export function UsersView() {
  const [key, setKey] = useState(0)

  const handleReset = () => {
    clearUsersCache()
    setKey((k) => k + 1)
  }

  return (
    <ErrorBoundary key={key} FallbackComponent={ErrorFallback} onReset={handleReset}>
      <Suspense fallback={<p>Loading…</p>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
  )
}
