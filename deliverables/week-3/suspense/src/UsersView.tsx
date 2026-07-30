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

export function UsersView() {
  return <p>TODO: render users with Suspense and an error boundary</p>
}
