import { UsersView } from './UsersView'
import './index.css'

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
      <h1 className="suspense-title">W3 · Suspense</h1>
      <UsersView />
    </main>
  )
}
