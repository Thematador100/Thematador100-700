
import React, { ErrorInfo, ReactNode } from 'react';

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
 */
class ErrorBoundary extends React.Component<Props, State> {
  // Fix: Explicitly using React.Component ensures the compiler correctly maps state and props generics to this context.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Property initializer with arrow function preserves 'this' context
  public handleDismiss = () => {
    // Fix: Accessing this.props through React.Component inheritance.
    const { onReset } = this.props;
    if (onReset) {
      onReset();
    }
    // Fix: Accessing this.setState through React.Component inheritance.
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    // Fix: Accessing this.state through React.Component inheritance.
    const { hasError, error } = this.state;
    // Fix: Accessing this.props through React.Component inheritance.
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center my-8 animate-fade-in">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-300 mb-2">Display Error</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            The AI generated data that couldn't be displayed correctly. This usually happens when the model output structure is incomplete.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg text-left overflow-auto max-h-32 mb-6 border border-slate-800">
            <p className="text-xs font-mono text-red-400 whitespace-pre-wrap">
              {error?.toString()}
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

    return children;
  }
}

export default ErrorBoundary;
