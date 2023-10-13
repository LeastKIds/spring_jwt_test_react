import React, { ErrorInfo, ReactNode  } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ScriptErrorBoundaryView extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // "Script error."가 포함된 오류만 캡처
        if (error.message.includes("Script error.")) {
            this.setState({ hasError: true, errorMessage: error.message });
        }
    }

    render() {
        if (this.state.hasError) {
            // 여기서 오류 메시지를 숨기거나 로깅할 수 있습니다.
            console.log("Captured error:", this.state.errorMessage);
            return null;  // 아무것도 렌더링하지 않습니다.
        }
        return this.props.children;
    }
}

export default ScriptErrorBoundaryView;