import { DebouncedSearch } from './DebouncedSearch'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <div className="iact-demo">
      <div className="iact-demo__inner">
        <header className="iact-demo__masthead">
          <h1 className="iact-demo__title">Interactivity: Hooks & Effects</h1>
        </header>
        <DebouncedSearch />
      </div>
    </div>
  )
}
