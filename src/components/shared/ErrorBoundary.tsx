'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-6">Please refresh the page to try again.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
