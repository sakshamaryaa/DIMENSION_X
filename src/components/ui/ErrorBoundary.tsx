import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('DIMENSION X ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="dx-card p-6 border-red-400/30 bg-[#101B2D]/90">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-display font-bold text-[#EAF4FF]">
                {this.props.fallbackTitle ?? 'Module Render Error'}
              </h3>
              <p className="text-sm text-[#91A3BA]">
                {this.state.errorMessage || 'An unexpected error occurred in this scientific module.'}
              </p>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, errorMessage: '' })}
                className="inline-flex items-center gap-2 rounded-lg border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-3 py-1.5 text-xs font-medium text-[#00D9FF] hover:bg-[#00D9FF]/20"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Module
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
