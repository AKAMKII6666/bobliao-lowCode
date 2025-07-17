declare namespace Window {
	interface Window {
		m_runtime: {
			env: {
				ORG_CODE: string;
			};
		};
	}
}

declare interface NodeModule {
	hot?: {
		accept(path?: string, callback?: () => void): void;
	};
}
