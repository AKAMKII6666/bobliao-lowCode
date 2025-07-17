import { lazy } from "react";

// ==============================|| MAIN ROUTING ||============================== //

const Index = lazy(() => import("renderer/views/index/index"));

const Management = [
	{
		path: "/",
		element: <Index />,
	},
	{
		path: "/index",
		element: <Index></Index>,
	},
];

export default Management;
