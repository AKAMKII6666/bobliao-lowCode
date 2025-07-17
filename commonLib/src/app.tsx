/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：2025年2月4日 10:21:30
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement } from "react";
import TestPage from "./view/testPage";

/**
 * 传入参数
 */
export interface iprops {}

const Home: FC<iprops> = (): ReactElement => {
	return (
		<>
			<TestPage></TestPage>
		</>
	);
};
export default Home;
