import { RouterProvider } from "react-router-dom";

// routing
import router from "routes";

import ThemeCustomization from "MithalCommonLibrary/publicThemeSystem";

// auth provider
import { useEffect, useState } from "react";

// ==============================|| APP ||============================== //

const App = () => {
	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
		};
	}, []);

	return (
		<ThemeCustomization>
			<>
				<RouterProvider router={router} />
			</>
		</ThemeCustomization>
	);
};

export default App;
