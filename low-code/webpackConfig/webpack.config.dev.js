const path = require("path");
const mainConfig = require("./webpack.config.js");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const threadLoader = require("thread-loader");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

threadLoader.warmup({}, ["ts-loader"]);

console.log("=========启动Web调试=========");
var devConfig = {
	mode: "development",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../webDevBuild"),
		publicPath: "/",
	},
	cache: {
		type: "filesystem", // 使用文件系统缓存,
		allowCollectingMemory: true,
	},
	devtool: "eval-source-map",
	devServer: {
		open: false,
		port: 666,
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
		},
		/* 开启代理 */
		proxy: [
			/* 调试代理 */
		],
	},
	ignoreWarnings: [
		{
			module: /sass\.dart\.js/,
			message: /require function is used in a way/,
		},
	],
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
			"process.env.ORG_CODE": JSON.stringify(process.env.ORG_CODE || "default_value"),
			"process.env.API_MODE": JSON.stringify(process.env.API_MODE || "development"),
			"process.env.SITE_TITLE": JSON.stringify(process.env.SITE_TITLE || "----------"),
		}),
		new ModuleFederationPlugin({
			name: "HostApp",
			remotes: {
				MithalCommonLibrary: "MithalCommonLibrary@http://localhost:2203/remoteEntry.js",
			},
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
			shared: require("./ModuleFederationPlugin.config.js"),
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
