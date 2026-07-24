import { ErrorBoundary } from './ErrorBoundary'
import { SearchableContacts } from './SearchableContacts'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main className="contact-demo">
      <div className="contact-demo__inner">
        <header className="contact-demo__masthead">
          <h1 className="contact-demo__title">Contact List</h1>
        </header>
        <ErrorBoundary>
          <SearchableContacts />
        </ErrorBoundary>
      </div>
    </main>
  )
}
