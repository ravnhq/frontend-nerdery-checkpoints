// STUB — replace with a real Suspense + Error Boundary implementation.
//
// Build the feature described in README.md:
//   - a module-level promise cache created by calling fetchUsers() once,
//   - an inner component that reads it with React 19's `use(promise)` hook and
//     renders each user's name,
//   - a <Suspense> boundary whose fallback shows "Loading…",
//   - a class Error Boundary whose fallback shows an error message and a
//     "Try again" button that clears the cache, refetches, and resets the
//     boundary (e.g. by bumping a `key` to remount the subtree).
//
// This placeholder renders static text so the acceptance tests fail on
// assertions (not on import/compile errors).
import { Suspense, use, Component, useState } from "react"
import { fetchUsers, type User } from "./api"
import { ReactNode } from "react"
let usersPromise: Promise<User[]> | null = null
export function UsersView() {
  const [key, setKey] = useState(0)
  function handleRetry() {
    usersPromise = null
    //setKey(key+1)
    setKey(prev => prev + 1)
  }
  return (
    <ErrorBoundary key={key} onRetry={handleRetry}>
      <Suspense fallback={<p>Loading</p>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
  )

}
export function getUsersPromise() {
  if (usersPromise === null) {
    usersPromise = fetchUsers()

  }
  return usersPromise
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

interface Props {
  children: ReactNode
  onRetry: () => void
}

class ErrorBoundary extends Component<Props> {
  state = { hasError: false }
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }
  componentDidCatch(error: Error) {
    console.error(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>Something went wrong</p>
          <button onClick={this.props.onRetry}>Try again</button>
        </div>)
    }
    else {
      return this.props.children
    }
  }
}

