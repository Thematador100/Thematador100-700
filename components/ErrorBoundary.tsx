
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary class to catch rendering errors in the component tree.
 * Fix: Inherit directly from Component<Props, State> to ensure TypeScript correctly resolves inherited members like this.props and this.setState.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  /**
   * Fix: Arrow function property ensures 'this' context is bound to the instance,
   * allowing access to inherited members this.props and this.setState.
   */
  public handleDismiss = () => {
    // Fix: Access this.props from inherited Component
    if (this.props.onReset) {
      this.props.onReset();
    }
    // Fix: Access this.setState from inherited Component
    this.setState({ hasError: false, error: null });
  };

  public render() {
    // Fix: Access this.state from inherited Component
    if (this.state.hasError) {
      return (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center my-8 animate-fade-in">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-300 mb-2">Display Error</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            The AI generated data that couldn't be displayed correctly. This usually happens when the model output structure is incomplete.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg text-left overflow-auto max-h-32 mb-6 border border-slate-800">
            <p className="text-xs font-mono text-red-400 whitespace-pre-wrap">
              {this.state.error?.toString()}
            </p>
          </div>
          <button
            onClick={this.handleDismiss}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Dismiss & Clear Data
          </button>
        </div>
      );
    }

    // Fix: Access this.props correctly from the inherited Component
    return this.props.children;
  }
}

export default ErrorBoundary;
