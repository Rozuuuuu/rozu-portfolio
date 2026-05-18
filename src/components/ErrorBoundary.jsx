import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 rounded-xl text-center my-8">
                    <span className="material-symbols-outlined text-4xl text-neutral-400 mb-4 block">warning</span>
                    <h3 className="font-headline text-lg font-bold text-black dark:text-white mb-2 tracking-tight">Component Error</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                        We encountered an issue loading this section.
                    </p>
                    <button 
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest rounded transition-transform active:scale-95"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
