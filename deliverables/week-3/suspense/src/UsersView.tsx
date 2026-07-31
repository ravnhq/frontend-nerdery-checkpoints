import { fetchUsers, User } from "./api"
import { Component, Suspense, use, useState, type ErrorInfo, type ReactNode } from "react"
import styles from "./UsersView.module.css"
import { createResource, type Resource } from "./resource"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Error loading user data: ${error}`, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

const usersResource: Resource<User[]> = createResource(() => fetchUsers())

function Users(): ReactNode {
  const users = use(usersResource.read())

  return (
    <ul className={styles.list}>
      {users.map(user => {
        return <li className={styles.item} key={user.id}>
                 <p className={styles.name}>{user.name}</p>
                </li>
      })}
    </ul>
  )
}

export function UsersView() {
  const [attempt, setAttempt] = useState(0)

  function handleClick() {
    setAttempt(prevValue => prevValue + 1)
    usersResource.invalidate()
  }

  const fallback = (<div className={styles.alert} role="alert">
                      <p className={styles.alertText}>Something went wrong</p>
                      <button className={styles.retry} onClick={handleClick}>Try again</button>
                   </div>)
  return (
    <div className={styles.view}>
      <ErrorBoundary key={attempt} fallback={fallback}>
        <Suspense fallback={<p className={styles.loading}>Loading…</p>}>
          <Users/>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
