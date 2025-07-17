// HMR Support
if (module.hot) {
	module.hot.accept();
}

import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./app";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
	<>
		<Home />
	</>
);
