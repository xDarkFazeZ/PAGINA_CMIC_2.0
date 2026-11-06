import { cmicClasses } from '../styles/recipes';
import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[CMIC]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className={cmicClasses("container tw:py-16 tw:text-center")}>
          <h1 className={cmicClasses("tw:text-2xl tw:font-bold")}>No pudimos cargar esta página</h1>
          <p>Intenta recargar para volver a consultar el contenido.</p>
          <button className={cmicClasses("tw:rounded tw:bg-red-700 tw:px-5 tw:py-3 tw:text-white")} onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
