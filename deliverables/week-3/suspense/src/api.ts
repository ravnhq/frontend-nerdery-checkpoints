export interface User {
  id: string
  name: string
}

const SAMPLE_USERS: User[] = [
  { id: '1', name: 'Ada Lovelace' },
  { id: '2', name: 'Alan Turing' },
  { id: '3', name: 'Grace Hopper' },
]

// Simulates a network request. Tests MOCK this function to control
// resolution/rejection, so the real delay never runs under test.
export function fetchUsers(): Promise<User[]> {
  const shouldFail = false

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load users'))
        return
      }

      resolve(SAMPLE_USERS)
    }, 3000)
  })
}
