import MainContainer from "./MainContainer";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: "/",
	errorElement: <>Error 404</>,
	/* element: <outLet></outLet>, */
	children: [MainContainer],
};

export default MainRoutes;
