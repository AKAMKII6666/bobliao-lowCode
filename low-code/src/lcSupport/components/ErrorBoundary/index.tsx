import React from "react";

interface IErrorBoundaryProps {
	fallback?: React.ReactNode;
	children: React.ReactNode;
	renderStamp?: any;
}

interface IErrorBoundaryState {
	hasError: boolean;
	error: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true, error };
	}

	componentDidCatch(error: any, info: any) {
		console.error("ErrorBoundary caught an error:", error, info);
	}

	componentDidUpdate(prevProps: IErrorBoundaryProps) {
		// 如果 renderStamp 变化了，说明是一次重渲染尝试，重置错误状态
		if (prevProps.renderStamp !== this.props.renderStamp && this.state.hasError) {
			this.setState({ hasError: false, error: null });
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div style={{ color: "red", whiteSpace: "pre-wrap", padding: "10px", background: "#fff0f0" }}>
						<strong>组件发生错误：</strong>
						<br />
						{String(this.state.error?.message || this.state.error)}
					</div>
				)
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
