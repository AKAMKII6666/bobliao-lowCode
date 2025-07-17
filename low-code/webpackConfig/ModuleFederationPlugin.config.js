module.exports = {
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
		requiredVersion: "6.18.2",
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
	"webpack-dev-server": {
		singleton: true,
		requiredVersion: "5.2.1",
	},
	"react-hot-toast": {
		singleton: true,
		requiredVersion: "2.5.1",
	},
};
