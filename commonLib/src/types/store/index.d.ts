// key = errorBoundaryContext
interface IerrorBoundaryContext {
	resetBoundary?: () => void;
	errorInfo?: {
		error?: string;
		info?: string;
	};
}
