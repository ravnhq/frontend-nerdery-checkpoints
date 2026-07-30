import { Component, Suspense, use } from 'react'
import type { ReactNode } from 'react'
import type { User } from './api'
import { fetchUsers } from './api'

let cache: Promise<User[]> | null = null

function getUsers() {
  if (!cache) {
    cache = fetchUsers()
  }
  return cache
}

function clearCache() {
  cache = null
}

function UsersList() {
  const users = use(getUsers())
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('UsersView error:', error)
  }

  handleRetry = () => {
    clearCache()
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <p>Failed to load users. <button onClick={this.handleRetry}>Try again</button></p>
    }
    return this.props.children
  }
}

export function UsersView() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading users…</p>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
  )
}
