export const findPropNode = function (path: (string | number)[], allprop: any) {
	let lastNode = allprop;
	for (let i of path) {
		if (typeof lastNode[i] !== "object" || lastNode[i] === null) {
			lastNode[i] = {}; // 如果路径中某一级是 undefined/null，则创建新对象
		}
		lastNode = lastNode[i];
	}
	return lastNode;
};

export const setPropNode = function (path: (string | number)[], allprop: any, value: any) {
	if (path.length === 0) {
		throw new Error("路径不能为空");
	}
	let lastNode = allprop;
	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i];
		if (typeof lastNode[key] !== "object" || lastNode[key] === null) {
			lastNode[key] = typeof path[i + 1] === "number" ? [] : {};
		}
		lastNode = lastNode[key];
	}
	lastNode[path[path.length - 1]] = value;
};

export const findPropNodeValue = function (path: (string | number)[], allprop: any) {
	let lastNode = allprop;
	for (let i of path) {
		lastNode = lastNode[i];
	}
	return lastNode;
};
