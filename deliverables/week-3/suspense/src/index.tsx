import { UsersView } from './UsersView'
import './suspense.css'

export default function Demo() {
  // Demo shell only; the Suspense behavior lives in UsersView.
  return (
    <main className="suspense-demo">
      <section className="suspense-demo__panel" aria-labelledby="suspense-demo-title">
        <h1 id="suspense-demo-title">Suspense users</h1>
        <UsersView />
      </section>
    </main>
  )
}
