import { DebouncedSearch } from './DebouncedSearch'
import './styles.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main className="app" style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '1rem auto', padding: '0 1rem' }}>
      <h1>Interactivity: Hooks & Effects</h1>
      <DebouncedSearch />
    </main>
  )
}
