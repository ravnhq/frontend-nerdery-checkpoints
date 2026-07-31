import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import { UsersView } from './UsersView'
import './index.css'

export default function Demo() {
  return (
    <ThemeProvider>
      <div className="roster-demo">
        <div className="roster-demo__inner">
          <header className="roster-demo__masthead">
            <h1 className="roster-demo__title">Roster</h1>
            <ThemeToggle />
          </header>
          <UsersView />
        </div>
      </div>
    </ThemeProvider>
  )
}
