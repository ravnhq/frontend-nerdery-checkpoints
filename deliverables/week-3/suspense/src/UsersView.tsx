import { Component, ReactNode, Suspense, use, useState } from "react"
import { fetchUsers, User } from "./api"

let userPromise: Promise<User[]> | null = null


interface ErrorBoundaryProps {
  children: ReactNode
  onRetry: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

class UserErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>Something went wrong while fetching users.</p>
          <button onClick={this.props.onRetry}>Try Again</button>
        </div>
      )
    }
    return this.props.children
  }
}

function getUsersPromise(): Promise<User[]> {
  if (!userPromise) {
    userPromise = fetchUsers()
  }
  return userPromise
}

function UserList() {
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
  const [retryCount, setRetryCount] = useState(0)

  const handleRetry = () => {
    userPromise = null
    setRetryCount((prev) => prev + 1)
  }

  return (
    <UserErrorBoundary key={retryCount} onRetry={handleRetry}>
      <Suspense fallback={<div>Loading users...</div>}>
        <UserList />
      </Suspense>
    </UserErrorBoundary>
  )
}
