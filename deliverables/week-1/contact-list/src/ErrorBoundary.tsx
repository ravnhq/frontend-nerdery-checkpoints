import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {

  state: State = { hasError: false }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', _error, _info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p role="alert">Something went wrong</p>
    }
    return this.props.children
  }
}
