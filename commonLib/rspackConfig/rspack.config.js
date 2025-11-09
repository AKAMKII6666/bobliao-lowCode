const path = require("path");
const { rspack } = require("@rspack/core");
// 引入 Rspack 提供的 Module Federation 插件（用于 MF v2.0 功能，如类型声明）:contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack");
// 引入其他所需插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh"); // Rspack 的 React Fast Refresh 插件:contentReference[oaicite:2]{index=2}

console.log("---------------------------------------");
console.log("                RSPack                 ");
console.log("---------------------------------------");
console.log(__dirname);
console.log(path.resolve(__dirname, "../src/"));
console.log("---------------------------------------");

module.exports = (env, argv) => {
	const isDev = process.env.NODE_ENV !== "production"; // 根据运行模式判断开发/生产环境

	console.log("+++++++++++++++++++++++++++++++++++++++");
	console.log(process.env.NODE_ENV);
	console.log("+++++++++++++++++++++++++++++++++++++++");
	return {
		// 基础配置
		target: "web",
		mode: isDev ? "development" : "production",
		entry: "./src/index", // 项目入口（原 webpack.config.js 中 "./src/dev-hotloader" 已被注释，不纳入配置）
		output: {
			path: isDev
				? path.resolve(__dirname, "../webDevBuild") // 开发环境输出路径
				: path.resolve(__dirname, "../dist"), // 生产环境输出路径
			publicPath: isDev
				? "http://localhost:2203/" // DevServer 地址
				: "https://stylesystemupdate.bobliaocommonlib.pages.dev/", // 生产环境使用相对路径或 CDN 路径
			filename: isDev
				? "bundle.js" // 开发环境下简单文件名
				: "[id]_[name]_[contenthash].rl.js", // 生产环境下带内容哈希的文件名
			chunkFilename: isDev
				? "[id].js" // 开发模式下按默认命名异步块
				: "[id]_[name]_[contenthash].rl.js", // 生产模式下异步块文件名（带版本哈希）
			clean: !isDev, // 启用输出目录清理替代 CleanWebpackPlugin:contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}
		},
		devtool: isDev ? "eval-source-map" : false, // 开发环境使用快速映射，生产环境不生成 source map
		cache: isDev ? { type: "filesystem", allowCollectingMemory: true } : false, // 仅在开发模式启用持久化缓存，加速二次构建
		stats: {
			colors: true,
			modules: true,
			reasons: true,
			errorDetails: true,
			timings: true,
		},
		// 模块加载器配置
		module: {
			rules: [
				// 处理 TypeScript/JavaScript，使用 Rspack 内置 SWC 编译器以支持 TSX/JSX 并开启快速刷新:contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: "builtin:swc-loader", // Rspack 内置高速 SWC 加载器:contentReference[oaicite:8]{index=8}
						options: {
							jsc: {
								parser: { syntax: "typescript", tsx: true }, // 解析 TS/TSX 语法:contentReference[oaicite:9]{index=9}
								transform: {
									react: {
										development: isDev,
										refresh: isDev, // 注入 React Fast Refresh 代码:contentReference[oaicite:10]{index=10}
									},
								},
							},
						},
					},
					type: "javascript/auto",
				},
				{
					test: /\.(m?js|jsx)$/, // 匹配 JS/JSX 文件
					exclude: /node_modules/,
					use: {
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: { syntax: "ecmascript", jsx: true }, // 解析 JS/JSX 语法:contentReference[oaicite:11]{index=11}
								transform: {
									react: {
										development: isDev,
										refresh: isDev,
									},
								},
							},
						},
					},
					type: "javascript/auto",
				},
				// SCSS Modules 样式，启用 CSS Modules
				{
					test: /\.module\.s[ac]ss$/i,
					use: [
						rspack.CssExtractRspackPlugin.loader, // 使用 Rspack 的 CSS 提取 loader:contentReference[oaicite:12]{index=12}
						{
							loader: "css-loader",
							options: { modules: true },
						},
						"postcss-loader",
						{
							loader: "sass-loader",
							options: { implementation: require("sass") },
						},
					],
					type: "javascript/auto",
				},
				// 全局 SCSS 样式
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.s[ac]ss$/i,
					use: [
						rspack.CssExtractRspackPlugin.loader,
						"css-loader",
						"postcss-loader",
						{
							loader: "sass-loader",
							options: { implementation: require("sass") },
						},
					],
					type: "javascript/auto",
				},
				// Less 样式
				{
					test: /\.less$/i,
					use: [rspack.CssExtractRspackPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
					sideEffects: true,
					type: "javascript/auto",
				},
				// 普通 CSS 样式
				{
					test: /\.css$/,
					use: [rspack.CssExtractRspackPlugin.loader, "css-loader", "postcss-loader"],
					type: "javascript/auto",
				},
				// 媒体或模型等资源文件
				{
					test: /\.(obj|fbx|wav|mp4)$/,
					type: "asset/resource",
					generator: { filename: "[name]_[contenthash][ext]" }, // 保持与 file-loader 相同的命名格式
				},
				// 字体文件
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource", // 使用资源模块处理，默认文件名格式 [hash][ext]
				},
				// 图片资源
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
					generator: {
						filename: "static/[hash][ext][query]", // 输出到 static 子目录
					},
				},
			],
		},
		// 模块解析配置，支持 TypeScript 路径别名:contentReference[oaicite:15]{index=15}:contentReference[oaicite:16]{index=16}
		resolve: {
			extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".tsx", ".ts"],
			modules: [path.resolve(__dirname, "src"), "node_modules"], // 在 src 目录下也查找模块
			tsConfig: path.resolve(__dirname, "../tsconfig.json"), // 自动根据 tsconfig.json 的 paths 和 baseUrl 设置别名:contentReference[oaicite:17]{index=17}
		},
		// 插件配置
		plugins: [
			new rspack.CssExtractRspackPlugin({
				// 可选：filename: isDev ? "[name].css" : "[name].[contenthash].css"
			}), // 替换 mini-css-extract-plugin，用于提取 CSS:contentReference[oaicite:18]{index=18}:contentReference[oaicite:19]{index=19}
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "index.html",
				inject: true, // 与 HtmlRspackPlugin 功能类似，保持注入脚本的行为
			}),
			// **模块联邦插件**：保留远程模块配置
			new ModuleFederationPlugin({
				...require("../federation.config.json"), // 引入 name 和 exposes 定义
				filename: "remoteEntry.js",
				// 类型声明生成配置（Module Federation v2 功能）
				dts: {
					generateTypes: {
						tsConfigPath: "./tsconfig.dts.json",
						typesFolder: "@mf-types",
						extractThirdParty: false,
						extraCompilerOptions: {
							skipLibCheck: true,
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
						requiredVersion: "5.14.18",
					},
					"@mui/lab": {
						singleton: true,
						requiredVersion: "5.0.0-alpha.153",
					},
					"@mui/material": {
						singleton: true,
						requiredVersion: "5.14.18",
					},
					"@mui/styles": {
						singleton: true,
						requiredVersion: "5.14.18",
					},
					"@mui/x-data-grid": {
						singleton: true,
						requiredVersion: "^6.18.2",
					},
					"@mui/x-date-pickers": {
						singleton: true,
						requiredVersion: "6.18.2",
					},
					"@mui/x-date-pickers-pro": {
						singleton: true,
						requiredVersion: "6.19.7",
					},
					"@mui/x-tree-view": {
						singleton: true,
						requiredVersion: "7.5.0",
					},
					"@emotion/react": {
						singleton: true,
						requiredVersion: "11.11.1",
					},
					"@emotion/styled": {
						singleton: true,
						requiredVersion: "11.11.0",
					},
					"@rspack/dev-server": {
						singleton: true,
						requiredVersion: "1.1.3",
					},
					"@rspack/plugin-react-refresh": {
						singleton: true,
						requiredVersion: "1.4.3",
					},
					"react-hot-toast": {
						singleton: true,
						requiredVersion: "2.5.1",
					},
				}, // 共享依赖
			}),
			new rspack.ProvidePlugin({
				React: "react", // 全局提供 React（与 webpack 配置一致）:contentReference[oaicite:20]{index=20}:contentReference[oaicite:21]{index=21}
			}),
			new rspack.ProgressPlugin({
				// 控制台输出构建进度
				activeModules: true,
				entries: true,
				modules: true,
				modulesCount: 100,
				profile: true,
			}),
			// 开发环境专用插件
			...(isDev
				? [
						new ReactRefreshPlugin(), // 替代 @pmmmwh/react-refresh-webpack-plugin:contentReference[oaicite:22]{index=22}
						// 开启 HMR 的插件（可选，devServer.hot=true 时已自动开启 HMR）
						new rspack.HotModuleReplacementPlugin(),
						new rspack.DefinePlugin({
							SYS_MODE: JSON.stringify("development"),
							"process.env.SYS_MODE": JSON.stringify("development"),
						}),
				  ]
				: [
						// 生产环境专用插件
						new rspack.DefinePlugin({
							SYS_MODE: JSON.stringify("production"),
							"process.env.SYS_MODE": JSON.stringify("production"),
						}),
						new rspack.CopyRspackPlugin({
							patterns: [{ from: "public", to: "." }],
						}), // 替代 copy-webpack-plugin，将 public 目录复制到输出目录:contentReference[oaicite:23]{index=23}:contentReference[oaicite:24]{index=24}
						new CompressionPlugin({
							algorithm: "gzip",
							test: /\.(js|css|json|html)(\?.*)?$/i,
							threshold: 10240,
							minRatio: 0.8,
						}),
				  ]),
		],
		// 优化选项配置
		optimization: isDev
			? {
					// 开发模式下关闭一些耗时的优化，以提高构建速度
					removeAvailableModules: false,
					removeEmptyChunks: false,
					splitChunks: false, // 开发环境关闭代码拆分，生产环境使用默认拆分策略
					minimize: false, // 生产环境开启代码压缩
					usedExports: false, // 生产模式执行 Tree-Shaking
					concatenateModules: false, // 生产模式下启用模块合并优化
					chunkIds: "natural",
					moduleIds: "natural",
					minimizer: [],
			  }
			: {
					removeAvailableModules: true,
					removeEmptyChunks: true,
					splitChunks: {
						chunks: "all",
						minSize: 20000, // 最小拆分体积
						maxAsyncRequests: 30,
						maxInitialRequests: 30,
						cacheGroups: {
							defaultVendors: {
								test: /[\\/]node_modules[\\/]/,
								priority: -10,
								reuseExistingChunk: true,
							},
							default: {
								minChunks: 2,
								priority: -20,
								reuseExistingChunk: true,
							},
						},
					},
					minimize: true,
					usedExports: true,
					concatenateModules: true,
					chunkIds: "deterministic", // 让chunk hash更稳定
					moduleIds: "deterministic", // 模块id稳定
					realContentHash: true, // 使用真实内容计算hash，提升缓存命中率
					flagIncludedChunks: true,
					sideEffects: true, // 需要配合 package.json 的 "sideEffects" 字段
					minimizer: [
						new rspack.SwcJsMinimizerRspackPlugin({
							compress: {
								drop_console: true, // 删除 console.log
								drop_debugger: true, // 删除 debugger
								passes: 2, // 多次压缩提高优化效果
								pure_funcs: ["console.info"], // 可以配置清除其它函数调用
							},
							mangle: true,
							format: {
								comments: false, // 移除注释
							},
							target: "es2017",
						}),
						new CssMinimizerPlugin(),
						new HtmlMinimizerPlugin(),
					],
			  },
		// 开发服务器配置（仅在 rspack serve 时生效）
		devServer: isDev
			? {
					open: false,
					port: 2203,
					hot: true,
					liveReload: false,
					historyApiFallback: true,
					compress: true,
					host: "0.0.0.0",
					watchFiles: ["src/**/*"],
					static: {
						directory: path.join(__dirname, "public"),
					},
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
						"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
					},
					proxy: [
						{
							context: ["/proxyCrosToTest"],
							target: "https://xnysit.mithrilgaming.com/",
							changeOrigin: true,
							pathRewrite: { "^/proxyCrosToTest": "" },
						},
						{
							context: ["/proxyCrosToPro"],
							target: "https://xnypro.mithrilgaming.com/",
							changeOrigin: true,
							pathRewrite: { "^/proxyCrosToPro": "" },
						},
						{
							context: ["/proxyCrosToPre"],
							target: "https://xnypre.mithrilgaming.com/",
							changeOrigin: true,
							pathRewrite: { "^/proxyCrosToPre": "" },
						},
					],
			  }
			: undefined,
		// 实验特性
		experiments: {
			lazyCompilation: isDev, // 开发环境启用按需编译，加快初始启动:contentReference[oaicite:28]{index=28}:contentReference[oaicite:29]{index=29}
		},
	};
};
