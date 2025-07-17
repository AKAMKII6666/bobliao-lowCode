import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

// third party
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

// project imports
import App from "App";
import react from "react";

import "./index.scss";

// google fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// ==============================|| REACT DOM RENDER ||============================== //
// create a client
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
			suspense: true,
		},
	},
});

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
	<>
		<QueryClientProvider client={queryClient}>
			{/* <ConfigProvider> */}
			<App />
			{/* </ConfigProvider> */}
		</QueryClientProvider>
		<Toaster position="bottom-right" />
	</>
);

console.log("!------------>host React.version:", react.version);
