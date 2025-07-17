// Rspack配置：功能等效于Webpack配置
const path = require("path");
const rspack = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
// 注意：MiniCssExtractPlugin 已由 Rspack 内置 CssExtractRspackPlugin 替代
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/rspack");
// const CopyPlugin = require("copy-webpack-plugin"); // 改用 Rspack 内置 CopyRspackPlugin
// const autoprefixer = require("autoprefixer"); // autoprefixer 通过 PostCSS 配置使用，无需在此直接引入
const fs = require("fs");
const mfShared = require("./ModuleFederationPlugin.config.js");

module.exports = (env, argv) => {
	const isDev = process.env.NODE_ENV === "development";
	if (isDev) {
		console.log("=========启动Web调试=========");
	} else {
		console.log("=========正式发布Web站点=========");
	}

	// 生产模式下更新版本号文件
	if (!isDev) {
		const versionFile = path.resolve(__dirname, "../public/version.json");
		if (fs.existsSync(versionFile)) {
			const versionData = JSON.parse(fs.readFileSync(versionFile, "utf8"));
			versionData.APP_VERSION = Date.now();
			fs.writeFileSync(versionFile, JSON.stringify(versionData));
		}
	}

	const config = {
		target: "web",
		// 入口文件
		entry: ["./src/index" /*, "./src/dev-hotloader"*/],
		// 控制台输出选项
		stats: {
			colors: true,
			modules: true,
			reasons: true,
			errorDetails: true,
			timings: true,
		},
		module: {
			rules: [
				{
					// 支持 JS/TS/JSX/TSX 文件的编译
					test: /\.(m?js|jsx?|ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "ts-loader",
						options: {
							transpileOnly: true, // 仅转译，不进行类型检查
							compilerOptions: {
								module: "esnext", // 与 tsconfig.json 保持一致
							},
						},
					},
				},
				{
					// SCSS 全局样式（非 CSS Modules）
					test: /\.scss$/,
					exclude: /\.module\.scss$/,
					use: [
						rspack.CssExtractRspackPlugin.loader,
						"css-loader",
						"postcss-loader", // autoprefixer 插件在 postcss 配置中启用
						"sass-loader",
					],
				},
				{
					// SCSS/CSS 模块化样式（文件名包含 .module）
					test: /\.s?css$/,
					include: /\.module\.(c|sa|sc)ss$/,
					use: [
						rspack.CssExtractRspackPlugin.loader,
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[path][name]__[local]", // 保留原始类名格式
								},
							},
						},
						"postcss-loader",
						"sass-loader",
					],
				},
				{
					// Less 样式，默认按 CSS Modules 处理
					test: /\.less$/i,
					use: [
						rspack.CssExtractRspackPlugin.loader,
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[path][name]__[local]",
								},
							},
						},
						"postcss-loader",
						"less-loader",
					],
					sideEffects: true,
				},
				{
					// 普通 CSS（非模块化）
					test: /\.css$/,
					use: [rspack.CssExtractRspackPlugin.loader, "css-loader", "postcss-loader"],
				},
				{
					// 二进制资源（模型、媒体等）
					test: /\.(obj|fbx|wav|mp4)$/,
					loader: "file-loader",
					options: {
						name: "[name]_[contenthash].[ext]",
					},
				},
				{
					// 字体资源
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
				},
				// {
				//   test: /\.svg$/,
				//   use: ["@svgr/webpack"],
				//   issuer: { and: [/\.(ts|tsx|js|jsx|md|mdx)$/] }
				// },
				{
					// 图片资源
					test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
					type: "asset/resource",
					generator: {
						filename: "static/[hash][ext][query]",
					},
				},
			],
		},
		resolve: {
			extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".tsx", ".ts", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
			modules: [path.resolve(__dirname, "../src"), "node_modules"],
			alias: {
				// 路径别名，与 tsconfig.json 中的 paths 设置相对应
				renderer: path.resolve(__dirname, "../src"),
				"@": path.resolve(__dirname, "../src"),
				"~/*": path.resolve(__dirname, "../src/*"),
			},
		},
		plugins: [
			// CSS 抽离插件（替代 mini-css-extract-plugin）
			new rspack.CssExtractRspackPlugin(),
			new HtmlWebpackPlugin({
				template: "./src/index.html",
				filename: "index.html",
				inject: true,
			}),
			new CleanWebpackPlugin(),
			// 全局提供 React (免去每个文件 import React)
			new rspack.ProvidePlugin({
				React: "react",
			}),
			new rspack.ProgressPlugin({
				activeModules: true,
				entries: true,
				modules: true,
				modulesCount: 100,
				profile: true,
			}),
		],
	};

	if (isDev) {
		// 开发模式配置
		config.mode = "development";
		config.output = {
			filename: "bundle.js",
			path: path.resolve(__dirname, "../webDevBuild"),
			publicPath: "/",
		};
		config.devtool = "eval-source-map";
		config.devServer = {
			open: false,
			port: 6666,
			hot: true,
			liveReload: false,
			historyApiFallback: true,
			compress: true,
			host: "0.0.0.0",
			watchFiles: ["src/**/*"],
			static: {
				directory: path.join(__dirname, "../public"),
			},
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			proxy: [
				{
					context: ["/proxyCrosToTest"],
					target: "https://test-xjy.herongkeji.com/land-resources",
					changeOrigin: true,
					pathRewrite: { "^/proxyCrosToTest": "" },
				},
				{
					context: ["/proxyCrosToPro"],
					target: "/",
					changeOrigin: true,
					pathRewrite: { "^/proxyCrosToPro": "" },
				},
				{
					context: ["/proxyCrosToPre"],
					target: "/",
					changeOrigin: true,
					pathRewrite: { "^/proxyCrosToPre": "" },
				},
			],
		};
		config.plugins.push(
			// React刷新插件 (替代 @pmmmwh/react-refresh-webpack-plugin)
			new ReactRefreshPlugin(),
			new rspack.DefinePlugin({
				SYS_MODE: JSON.stringify("developement"),
				"process.env.SYS_MODE": JSON.stringify("developement"),
				"process.env.ORG_CODE": JSON.stringify(process.env.ORG_CODE || "default_value"),
				"process.env.API_MODE": JSON.stringify(process.env.API_MODE || "development"),
				"process.env.SITE_TITLE": JSON.stringify(process.env.SITE_TITLE || "----------"),
			}),
			new ModuleFederationPlugin({
				name: "HostApp",
				remotes: {
					MithalCommonLibrary: "MithalCommonLibrary@http://localhost:2203/remoteEntry.js",
				},
				// 注意：Rspack ModuleFederationPlugin 暂不支持 dts 类型拉取选项
				// 默认会启用类型拉取与解压
				dts: {
					// 开启类型消费；也可设为对象以自定义选项
					consumeTypes: {
						// 本地存放类型的文件夹，默认 '@mf-types'
						typesFolder: "@mf-types",
						// 每次加载前是否先删除旧目录，默认 true
						deleteTypesFolder: true,
						// 指定远端类型包下载后解压到子目录名，默认 '@mf-types'
						remoteTypesFolder: "@mf-types",
						// 重试下载的最大次数，默认 3
						maxRetries: 3,
					},
				},
				shared: mfShared,
			})
		);
		// 开启实验性懒编译，加快首次编译速度
		config.experiments = {
			lazyCompilation: true,
		};
		// 调整优化选项以提升开发模式下编译速度
		config.optimization = {
			removeAvailableModules: false,
			removeEmptyChunks: false,
			splitChunks: false,
			minimize: false,
			concatenateModules: false,
			usedExports: false,
		};
		// 启用 HMR (热模块替换) 插件
		config.plugins.push(new rspack.HotModuleReplacementPlugin());
		// 开发模式启用缓存 (默认使用内存缓存)
		config.cache = true;
	} else {
		// 生产模式配置
		config.mode = "production";
		config.output = {
			filename: "[name].rl.js",
			chunkFilename: "[name].chunk.rl.js",
			path: path.resolve(__dirname, "../dist"),
			publicPath: "/",
		};
		config.target = ["web"];
		config.optimization = {
			chunkIds: "named",
			moduleIds: "named",
			minimize: true,
			usedExports: true,
			concatenateModules: true,
			minimizer: [
				// 使用 Rspack 内置 SWC JS 压缩 (替代 ESBuildMinifyPlugin)
				new rspack.SwcJsMinimizerRspackPlugin({
					mangle: false, // 不压缩标识符，保留变量和类名
				}),
			],
			splitChunks: {
				chunks: "all",
				cacheGroups: {
					default: {
						reuseExistingChunk: true,
						minChunks: 2,
						priority: -20,
					},
					vendors: {
						idHint: "node_modules",
						test: /[\\/]node_modules[\\/]/,
						minChunks: 1,
						minSize: 0,
					},
				},
			},
		};
		config.cache = false;
		config.plugins.push(
			new rspack.DefinePlugin({
				SYS_MODE: JSON.stringify("production"),
				"process.env.SYS_MODE": JSON.stringify("production"),
				"process.env.ORG_CODE": JSON.stringify(process.env.ORG_CODE || "default_value"),
				"process.env.API_MODE": JSON.stringify(process.env.API_MODE || "default_value"),
				"process.env.SITE_TITLE": JSON.stringify(process.env.SITE_TITLE || "----------"),
			}),
			new CompressionPlugin({
				algorithm: "gzip",
				test: /\.(js|css|json|html)(\?.*)?$/i,
				threshold: 10240,
				minRatio: 0.8,
			}),
			// 拷贝静态资源插件 (替代 copy-webpack-plugin)
			new rspack.CopyRspackPlugin({
				patterns: [{ from: "public", to: "" }],
			}),
			new ModuleFederationPlugin({
				name: "HostApp",
				remotes: {
					MithalCommonLibrary:
						"MithalCommonLibrary@https://static-unzip-file-source.oss-cn-beijing.aliyuncs.com/prod/SWYTStaticFiles/NewFarmerSport/0.0.7/dist/remoteEntry.js",
				},
				shared: mfShared,
			})
		);
		// 添加 CSS/HTML 压缩插件
		config.optimization.minimizer.push(
			new CssMinimizerPlugin(),
			new HtmlMinimizerPlugin({
				minimizerOptions: {
					collapseBooleanAttributes: true,
					useShortDoctype: true,
				},
			})
		);
	}

	return config;
};
