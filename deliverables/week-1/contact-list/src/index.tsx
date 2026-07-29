import { SearchableContacts } from './SearchableContacts'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '1rem auto', padding: '0 1rem' }}>
      <h1>Contact List</h1>
      <SearchableContacts />
    </main>
  )
}
