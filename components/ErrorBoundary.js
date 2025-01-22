// Updated ErrorBoundary.js
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '/ui/alert';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service if needed
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-lg">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mt-2">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              )}
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
