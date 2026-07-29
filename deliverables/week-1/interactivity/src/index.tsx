import { DebouncedSearch } from './DebouncedSearch'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main
      style={{
        fontFamily: 'system-ui',
        maxWidth: 640,
        margin: '1rem auto',
        padding: '0 1rem',
      }}
    >
      <h1 className="interactivity-title">Interactivity: Hooks & Effects</h1>
      <DebouncedSearch />
    </main>
  )
}
