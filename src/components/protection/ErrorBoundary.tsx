import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  handleReload = () => window.location.reload();
  handleGoHome = () => (window.location.href = "/");
  toggleDetails = () =>
    this.setState((prev) => ({ showDetails: !prev.showDetails }));

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-lg w-full text-center">

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-8 h-8 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-xl font-bold text-primary tracking-tight mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              An unexpected error occurred. You can try reloading the page or
              returning to the dashboard.
            </p>

            {/* Error pill */}
            {this.state.error && (
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6 max-w-full overflow-hidden">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest shrink-0">
                  Error
                </span>
                <span className="text-xs text-red-700 font-mono truncate">
                  {this.state.error.message || "Unknown error"}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-primary text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Go to Dashboard
              </button>
            </div>

            {/* Collapsible stack trace */}
            <button
              onClick={this.toggleDetails}
              className="inline-flex items-center gap-1.5 text-xs text-primary transition-colors cursor-pointer bg-transparent border-none mb-3"
            >
              {this.state.showDetails ? "Hide" : "Show"} technical details
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  this.state.showDetails ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {this.state.showDetails && (
              <pre className="text-left bg-primary text-white rounded-xl p-4 text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap break-all max-h-60 overflow-y-auto font-mono">
                {this.state.error?.stack}
                {"\n\n── Component Stack ──\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;