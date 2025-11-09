const path = require("path");
const mainConfig = require("./webpack.config.js");
const merge = require("webpack-merge");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

//给web发布版做版本号
//读写../public/version.json这个文件的目的是，
//打包发布时，给这个文件里的APP_VERSION打个时间戳
//在web页面里，每隔一段时间请求一下这个文件，如果时间戳有变化
//就刷新一下页面
const versionFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../public/version.json"), "utf8"));
versionFile.APP_VERSION = +new Date();
fs.writeFileSync(path.resolve(__dirname, "../public/version.json"), JSON.stringify(versionFile));

console.log("=========正式发布Web站点=========");
var devConfig = {
	mode: "production",
	output: {
		/**
		 * 配置主文件的文件名，加上版本号
		 */
		filename: "[id]_[name]_[contenthash].rl.js",
		/**
		 * 配置异步请求的文件名，也就是分支文件名，并加上版本号
		 */
		chunkFilename: "[id]_[name]_[contenthash].rl.js",
		path: path.resolve(__dirname, "../dist"),
		// https://github.com/webpack/webpack/issues/1114
		library: {
			type: "commonjs2",
		},
		publicPath: "https://stylesystemupdate.bobliaocommonlib.pages.dev/",
	},
	optimization: {
		chunkIds: "named",
		moduleIds: "named",
		minimize: true,
		//使用 Tree-Shaking 删除多余模块导出
		usedExports: true,
		//开启小模块的合并功能
		concatenateModules: true,
		/**
		 * 使用Terser
		 */
		minimizer: [
			new ESBuildMinifyPlugin({
				target: "esnext",
				/* 				keepNames: true, // ✅ 保留变量/类名 必须保留，否则无法判断组件名称
				minifyIdentifiers: false, // ❌ 关闭标识符压缩
				minifySyntax: false, // 仅压缩语法
				minifyWhitespace: true, // 仅压缩空格 */
			}),
		],
		/**
		 * 手动配置chunk的分包处理
		 */
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				default: {
					idHint: "",
					reuseExistingChunk: true,
					minChunks: 2,
					priority: -20,
				},
				/**
				 * 用这个配置强制将node_modules中的内容单独拆分成一个chunk
				 * 这样一来，客户端上的node_modules的chunk缓存就不需要频繁更新，内容更新才更新
				 */
				vendors: {
					idHint: "node_modules",
					/**
					 * 测试规则，现在测试规则就是将node_modules单独拆出来
					 */
					test: /[\\/]node_modules[\\/]/,
					/**
					 * 最小引用单位
					 */
					minChunks: 1,
					/**
					 * 最大分包尺寸
					 */
					minSize: 0,
				},
			},
		},
	},
	cache: false,
	plugins: [
		new webpack.DefinePlugin({
			/**
			 * 这里定义的环境变量可以直接在业务代码里拿到，
			 * 属于是webpack直接打印上去的，
			 * 并不是写在业务代码逻辑里的。
			 */
			SYS_MODE: JSON.stringify("production"),
			"process.env.SYS_MODE": JSON.stringify("production"),
		}),
		new CompressionWebpackPlugin({
			algorithm: "gzip",
			test: /\.(js|css|json|html)(\?.*)?$/i,
			threshold: 10240, // 大于10kb的才被压缩
			minRatio: 0.8, //压缩比例
		}),
		new CopyPlugin({
			patterns: [{ from: "./public", to: "./" }],
		}),
	],
};

module.exports = merge.merge(mainConfig, devConfig);
