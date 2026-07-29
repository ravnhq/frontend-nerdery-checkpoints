import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}
interface ErrorState {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, ErrorState> {
  state: ErrorState = { error: null }
  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.log('ErrorBoundary caught an error:', error)
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error }
  }

  render() {
    let content

    if (this.state.error) {
      content = this.props.fallback ?? (
        <div role="alert">Something went wrong</div>
      )
    } else {
      content = this.props.children
    }

    return content
  }
}
