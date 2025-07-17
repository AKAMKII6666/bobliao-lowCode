const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
/*const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin"); */
/* const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); */
/* var HardSourceWebpackPlugin = require("hard-source-webpack-plugin"); */
const webpack = require("webpack");

console.log("+++++++++++++++++++++++++++++++++++++++");
console.log(__dirname);
console.log(path.resolve(__dirname, "../src/"));
console.log("+++++++++++++++++++++++++++++++++++++++");

//属于webpack的主配置文件了
//其它的配置文件都需要混合主配置文件的
const mainConfig = {
	target: "web",
	/**
	 * "./src/App.tsx"  项目的主入口点
	 * "./src/dev.js"   用于配置react的HMR 开发时模块动态加载
	 *
	 */
	entry: ["./src/index" /* , "./src/dev-hotloader" */],
	//打包时输出的信息
	stats: {
		colors: true, // 让输出带有颜色
		modules: true, // 显示构建的模块信息
		reasons: true, // 显示被引入模块的原因
		errorDetails: true, // 显示详细错误信息
		timings: true, // 显示打包时间
	},
	module: {
		//不要去管这些大库，编译慢死了
		//这一段要在mac下删掉 不然有bug
		//noParse: /node_modules\/(lodash|@mui\/icons-material)/,
		rules: [
			{
				//使babel支持jsx也就是react所使用的文件
				test: /\.(m?js|jsx?|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
						//设置 transpileOnly: true：这会告诉 ts-loader 只进行语法转换而不进行类型检查。
						transpileOnly: true,
						compilerOptions: {
							// 解决pixi无法加载Texture的问题
							//解决了开发环境下热更新编译缓慢的问题
							module: "esnext",
						},
					},
				},
			},
			// SCSS Modules (*.module.scss)
			{
				test: /\.module\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},

			// 普通 SCSS
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.module\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.less$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
				sideEffects: true,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
			/**
			 * 这里可以用assets/resource替代
			 */
			{
				test: /\.(obj|fbx|wav|mp4)$/,
				loader: "file-loader",
				options: {
					name: "[name]_[contenthash].[ext]",
				},
			},
			// Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			/* {
				test: /\.svg$/,
				use: ['@svgr/webpack'],
				issuer: {
					and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
				}
			}, */
			// Images
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "static/[hash][ext][query]",
				},
			},
		],
	},
	plugins: [
		// 需要使用 `mini-css-extract-plugin` 将 CSS 代码抽取为单独文件
		// 才能命中 `css-minimizer-webpack-plugin` 默认的 `test` 规则
		new MiniCssExtractPlugin(),
		new htmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			//注入入口点代码
			inject: true,
		}),
		new CleanWebpackPlugin(),
		// 全局提供 React 变量
		new webpack.ProvidePlugin({
			React: "react",
		}),
		/* new webpack.DllReferencePlugin({
			context: path.resolve(__dirname, "../"),
			manifest: require("./dll/nodeModules-manifest.json"), // 引用 manifest 文件
		}),
		new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, "./dll/nodeModules.dll.js"), // 将 DLL 文件自动插入到 HTML 中
			outputPath: "dist/",
			publicPath: "dist", // 或者你的publicPath
		}), */
		// 显示详细的构建进度
		new webpack.ProgressPlugin({
			activeModules: true, // 显示当前正在处理的模块
			entries: true, // 显示入口文件的构建进度
			modules: true, // 显示模块构建进度
			modulesCount: 100, // 限制显示的模块数，避免信息过多
			profile: true, // 显示构建耗时
		}),
		/* 
			组件共享插件
		*/
		new ModuleFederationPlugin({
			...require("../federation.config.json"),
			filename: "remoteEntry.js", // 远程模块的入口文件
			// —— DTS 生成配置 ——
			dts: {
				// 开启类型生成（可设为 true 或传入对象）
				generateTypes: {
					// 指定 tsconfig.json 路径，默认即为 './tsconfig.json'
					tsConfigPath: "./tsconfig.dts.json",
					// 输出的类型目录名称，默认为 '@mf-types'
					typesFolder: "@mf-types",
					// 不提取第三方依赖类型，避免冲突
					extractThirdParty: false,
					// 为了跳过声明文件检查，加上 skipLibCheck
					extraCompilerOptions: {
						skipLibCheck: true,
						// (可选) 如果你的 overrides 在 src/types/overrides 下，也可以排除它
						exclude: ["src/types/**/*"],
					},
				},
			},
			shared: {
				react: {
					singleton: true, // 保证所有应用共享同一个 React 实例
					requiredVersion: "18.1.0", // 指定所需的 React 版本
				},
				"react-dom": {
					singleton: true,
					requiredVersion: "18.1.0",
				},
				"react-router-dom": {
					singleton: true,
					requiredVersion: "6.27.0",
				},
				antd: {
					singleton: true,
					requiredVersion: "5.17.0",
				},
				"@mui/icons-material": {
					singleton: true,
					requiredVersion: "^5.14.18",
				},
				"@mui/lab": {
					singleton: true,
					requiredVersion: "^5.0.0-alpha.153",
				},
				"@mui/material": {
					singleton: true,
					requiredVersion: "^5.14.18",
				},
				"@mui/styles": {
					singleton: true,
					requiredVersion: "^5.14.18",
				},
				"@mui/x-data-grid": {
					singleton: true,
					requiredVersion: "^6.18.2",
				},
				"@mui/x-date-pickers": {
					singleton: true,
					requiredVersion: "^6.18.2",
				},
				"@mui/x-date-pickers-pro": {
					singleton: true,
					requiredVersion: "^6.19.7",
				},
				"@mui/x-tree-view": {
					singleton: true,
					requiredVersion: "7.5.0",
				},
				"@emotion/react": {
					singleton: true,
					requiredVersion: "^11.11.1",
				},
				"@emotion/styled": {
					singleton: true,
					requiredVersion: "^11.11.0",
				},
				"webpack-dev-server": {
					singleton: true,
					requiredVersion: "5.2.1",
				},
				"react-hot-toast": {
					singleton: true,
					requiredVersion: "2.5.1",
				},
			}, // 共享依赖
		}),
	],
	resolve: {
		//用于在代码中进行无后缀引用的配置
		extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".tsx", ".ts", ".png", ".jpg", ".jpeg", ".gif", ".svg"],
		// 让 Webpack 在 src 目录中查找模块
		modules: [path.resolve(__dirname, "../src"), "node_modules"],
		//路径别名配置
		alias: {
			// 将远程名映射到本地源码目录
			MithalCommonLibrary: path.resolve(__dirname, "../src/publicComponents/"),
			renderer: path.resolve(__dirname, "../src/"),
			"@": path.resolve(__dirname, "../src/"),
			"~/*": path.resolve(__dirname, "../src/"),
		},
	},
	optimization: {
		minimize: true,
		minimizer: [
			/**
			 * 使用css压缩
			 */
			new CssMinimizerPlugin(),
			/**
			 * 使用Html压缩
			 */
			new HtmlMinimizerWebpackPlugin({
				minimizerOptions: {
					// 折叠 Boolean 型属性
					collapseBooleanAttributes: true,
					// 使用精简 `doctype` 定义
					useShortDoctype: true,
				},
			}),
		],
	},
	cache: {
		type: "filesystem",
		allowCollectingMemory: true,
	},
};

module.exports = mainConfig;
