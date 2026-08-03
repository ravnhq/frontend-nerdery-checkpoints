import { fetchUsers, type User } from './api'
import { Component, Suspense, use, useState, type ReactNode } from 'react'
import { ThinkingOrb } from 'thinking-orbs'
import { LoadingText } from './LoadingText'
import './UsersView.css'

let usersPromise: Promise<User[]> | null = null

function getUsersPromise() {
  if (!usersPromise) {
    usersPromise = fetchUsers()
  }
  return usersPromise
}

type ErrorBoundaryProps = {
  children: ReactNode
  onRetry: () => void
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="users-view">
          <section className="users-view__status-card users-view__status-card--error">
            <span className="users-view__error-icon" aria-hidden="true" />
            <p className="users-view__eyebrow">Connection interrupted</p>
            <h1>We could not load the users</h1>
            <p className="users-view__description">Check your connection and try the request again.</p>
            <button className="users-view__retry-button" onClick={this.props.onRetry}>
              Try again
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

function LoadingState() {
  return (
    <main className="users-view">
      <section className="users-view__status-card users-view__status-card--loading">
        <div className="users-view__orb-wrap">
          <ThinkingOrb className="users-view__orb" state="solving" size={64} theme="dark" aria-label="Loading users" />
        </div>
        <p className="users-view__eyebrow"><LoadingText text="Please wait" variant="eyebrow" /></p>
        <h1><LoadingText text="Loading users..." variant="title" /></h1>
        <p className="users-view__description">Preparing the latest people for you.</p>
      </section>
    </main>
  )
}

function UsersList() {
  const users = use(getUsersPromise())

  return (
    <main className="users-view">
      <section className="users-view__content" aria-labelledby="users-view-title">
        <p className="users-view__eyebrow">Directory</p>
        <h1 id="users-view-title">Users</h1>
        <p className="users-view__description">The people currently available in your workspace.</p>
        <ul className="users-view__list">
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export function UsersView() {
  const [boundaryKey, setBoundaryKey] = useState(0)

  function handleRetry() {
    usersPromise = fetchUsers()
    setBoundaryKey((key) => key + 1)
  }

  return (
    <ErrorBoundary key={boundaryKey} onRetry={handleRetry}>
      <Suspense fallback={<LoadingState />}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
  )
}
