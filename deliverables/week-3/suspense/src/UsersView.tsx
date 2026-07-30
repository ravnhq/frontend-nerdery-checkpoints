import { Suspense, use } from 'react'
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

export function UsersView() {
  return (
    <Suspense fallback={<p>Loading users…</p>}>
      <UsersList />
    </Suspense>
  )
}
