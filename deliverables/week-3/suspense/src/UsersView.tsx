import { Component, Suspense, use, useEffect, useRef, useState, type ReactNode } from 'react'
import { fetchUsers, type User } from './api'
import './UsersView.css'

/**
 * One request, cached at module level. The first render that needs the users
 * starts it and every render after reuses the same promise, so re-rendering
 * the subtree never kicks off a second fetch. Initialising lazily rather than
 * at import time keeps a module that is imported but never rendered from
 * hitting the network at all.
 */
let usersPromise: Promise<User[]> | null = null

function getUsers(): Promise<User[]> {
  usersPromise ??= fetchUsers()
  return usersPromise
}

// Replaces the cached promise with a fresh request. Called from the retry
// handler rather than during a render, so exactly one new fetch goes out no
// matter how many times React re-renders the subtree afterwards.
function refetchUsers(): void {
  usersPromise = fetchUsers()
}

function UserList() {
  // `use` unwraps the cached promise: it suspends to the boundary below while
  // the request is pending, and re-throws on rejection.
  const users = use(getUsers())

  return (
    <ul className="roster__list">
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

interface ErrorFallbackProps {
  onRetry: () => void
}

// A separate component (not inline JSX) so it gets its own mount effect:
// ErrorBoundary swaps this in fresh each time it catches, which is exactly
// the moment focus should move to the fix-it action. `role="alert"` already
// gets the message announced without needing focus - this gets the button
// under a keyboard user's fingers too, instead of leaving them to Tab-hunt
// for it.
function ErrorFallback({ onRetry }: ErrorFallbackProps) {
  const retryRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    retryRef.current?.focus()
  }, [])

  return (
    <div role="alert" className="roster__alert">
      <p>Could not load users.</p>
      <button type="button" ref={retryRef} className="roster__retry" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// A rejected promise re-thrown by `use` surfaces as a render error, which only
// a class boundary can catch.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export function UsersView() {
  const [attempt, setAttempt] = useState(0)

  function handleRetry() {
    // Order matters: swap in the new promise first, then remount, so the
    // fresh subtree suspends on the new request instead of replaying the
    // rejected one.
    refetchUsers()
    setAttempt((previous) => previous + 1)
  }

  return (
    // The boundary sits outside Suspense so it catches the rejection, and the
    // key remounts it on retry, which is what clears `hasError` and leaves it
    // able to catch a later failure.
    <ErrorBoundary key={attempt} fallback={<ErrorFallback onRetry={handleRetry} />}>
      <Suspense fallback={<p className="roster__loading" role="status">Loading…</p>}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  )
}
