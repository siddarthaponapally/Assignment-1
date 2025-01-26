import {Component} from 'react'

// ErrorBoundary Component to catch errors
class ErrorBoundary extends Component {
  state = {hasError: false, errorMessage: ''}

  static getDerivedStateFromError(error) {
    return {hasError: true, errorMessage: error.message}
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong: {this.state.errorMessage}</h2>
    }
    return this.props.children
  }
}

export default ErrorBoundary
