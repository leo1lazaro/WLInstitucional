import React from "react";
import "./ErrorBoundary.css";

interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.props = props;
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="ErrorBoundary-container" role="alert">
          <h2 className="ErrorBoundary-title">Ops! Algo deu errado.</h2>
          <p className="ErrorBoundary-message">
            Não foi possível carregar esta seção. Por favor, tente atualizar a página ou tente novamente mais tarde.
          </p>
          <button
            className="ErrorBoundary-button"
            onClick={() => (this as any).setState({ hasError: false })}
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
