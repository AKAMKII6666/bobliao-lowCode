import { lazy } from "react";
import Management from "./Management";

// ==============================|| MAIN ROUTING ||============================== //

const MainContainer = {
	path: "/",
	errorElement: <>Error 404</>,
	children: [
		...Management,
		{
			path: "404",
			element: <>Error 404</>,
		},
		{
			path: "*",
			element: <>Error 404</>,
		},
		{
			path: "building",
			element: <>Error 404</>,
		},
	],
};

export default MainContainer;
