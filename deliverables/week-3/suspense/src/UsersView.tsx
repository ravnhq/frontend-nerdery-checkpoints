import { Suspense, use, useState } from 'react'
import { User, fetchUsers } from './api'
import { ErrorBoundary } from './ErrorBoundary'
import './UsersView.css'

let usersCache: Promise<User[]> | undefined

function getUsers(): Promise<User[]> {
  const usersPromise = usersCache ?? fetchUsers()
  usersCache = usersPromise
  return usersPromise
}

function clearUsersCache(setKey: React.Dispatch<React.SetStateAction<number>>) {
  usersCache = undefined
  setKey((key) => key + 1)
}

function UsersList() {
  const users = use(getUsers())

  return (
    <ul className="suspense-list">
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

export function UsersView() {
  const [key, setKey] = useState(0)

  return (
    <ErrorBoundary
      fallback={
        <div>
          <p role="alert">Error loading users</p>
          <button onClick={() => clearUsersCache(setKey)}>Try again</button>
        </div>
      }
      key={key}
    >
      <h2 className="suspense-subtitle">Users</h2>
      <Suspense fallback={<p className="suspense-loading">Loading…</p>}>
        <UsersList></UsersList>
      </Suspense>
    </ErrorBoundary>
  )
}
