const path = require("path");
const mainConfig = require("./webpack.config.js");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const threadLoader = require("thread-loader");
const { ModuleFederationPlugin } = require("webpack").container;

threadLoader.warmup({}, ["ts-loader"]);

console.log("=========启动Web调试=========");
var devConfig = {
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../webDevBuild"),
		publicPath: "http://localhost:2203/",
	},
	cache: {
		type: "filesystem", // 使用文件系统缓存,
		allowCollectingMemory: true,
	},
	devtool: "eval-source-map",
	module: {
		//不要去管这些大库，编译慢死了
		//这一段要在mac下删掉 不然有bug
		//noParse: /node_modules\/(lodash|@mui\/icons-material)/,
		rules: [
			{
				//使babel支持jsx也就是react所使用的文件
				test: /\.(m?js|jsx?|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					"thread-loader",
					{
						loader: "ts-loader",
						options: {
							//设置 transpileOnly: true：这会告诉 ts-loader 只进行语法转换而不进行类型检查。
							transpileOnly: true,
							happyPackMode: true,
							compilerOptions: {
								// 解决pixi无法加载Texture的问题
								//解决了开发环境下热更新编译缓慢的问题
								module: "esnext",
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		open: false,
		port: 2203,
		hot: true,
		liveReload: false,
		//避免在使用BrowserRouter的时候，因为devserver对路径做处理而找不到页面
		historyApiFallback: true,
		//启动gzip压缩,启动速度快
		compress: true,
		host: "0.0.0.0",
		watchFiles: ["src/**/*"],
		/* 指定public的位置 */
		static: {
			directory: path.join(__dirname, "../public"),
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
		},
		/* 开启代理 */
		proxy: [
			/* 调试代理 */
			{
				context: ["/proxyCrosToTest"],
				target: "https://xnysit.mithrilgaming.com/",
				changeOrigin: true,
				pathRewrite: { "^/proxyCrosToTest": "" },
			},
			/* 本地调试正式环境的代理 */
			{
				context: ["/proxyCrosToPro"],
				target: "https://xnypro.mithrilgaming.com/",
				changeOrigin: true,
				pathRewrite: { "^/proxyCrosToPro": "" },
			},
			/* 本地调试灰度环境的代理 */
			{
				context: ["/proxyCrosToPre"],
				target: "https://xnypre.mithrilgaming.com/",
				changeOrigin: true,
				pathRewrite: { "^/proxyCrosToPre": "" },
			},
		],
	},
	plugins: [
		new ReactRefreshWebpackPlugin(),
		/* new webpack.HotModuleReplacementPlugin(), */
		new webpack.DefinePlugin({
			/**
			 * 这里定义的环境变量可以直接在业务代码里拿到，
			 * 属于是webpack直接打印上去的，
			 * 并不是写在业务代码逻辑里的。
			 */
			SYS_MODE: JSON.stringify("developement"),
			"process.env.SYS_MODE": JSON.stringify("developement"),
		}),
	],

	/**
	 * 开启延迟编译
	 * 开启延迟编译后，所有异步模块只会在访问时被编译，首次编译将会只编译主干.
	 * 目前只是实验性功能，还不是正式版本，dev用用就好了
	 */
	experiments: {
		lazyCompilation: true,
	},
	/*
    让一些产物优化的功能在开发模式下关闭，减少资源消耗
    */
	optimization: {
		//这个是指检测模块重复打包的问题
		//在开发模式下可以不用关心模块重复打包的问题
		removeAvailableModules: false,
		//检测是否有空分支，这里为true的话，空分支将被移除
		//但是开发模式下可以不用移除空分支,少了这部分操作，wp的运行效率会变快
		removeEmptyChunks: false,
		//保持默认值或 false，关闭代码分包；
		splitChunks: false,
		//保持默认值或 false，关闭代码压缩；
		minimize: false,
		//保持默认值或 false，关闭模块合并；
		concatenateModules: false,
		//保持默认值或 false，关闭 Tree-shaking 功能；
		usedExports: false,
	},
	resolve: {
		/**
		 * v6版的reactdom在router+HMR下会出现bug,dev环境使用这个补丁进行修复
		 */
		alias: {
			/* "react-dom": "@hot-loader/react-dom", */
		},
	},
};

module.exports = merge.merge(mainConfig, devConfig);
