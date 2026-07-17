import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

// TODO: catch render errors from children and show a role="alert" fallback
// containing "Something went wrong". Right now it just renders children (no catching).
export class ErrorBoundary extends Component<Props> {
  state = { hasError: false}
  static getDerivedStateFromError() {
    return { hasError: true}
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    console.error(_error, _info)
  }

  render() {
    if(this.state.hasError) {
      return <div role="alert"> Something went wrong </div>
    }
    return this.props.children
  }
}
