import path from "path";
import fs from "fs";
import { Project, Type } from "ts-morph";

// 配置路径
const ROOT_DIR = path.resolve(__dirname);
const CONFIG_PATH = path.join(ROOT_DIR, "federation.config.json");
const OUTPUT_DIR = path.join(ROOT_DIR, "PropsJsonMeta");

// 初始化 ts-morph 项目
const project = new Project({
	tsConfigFilePath: path.join(ROOT_DIR, "tsconfig.json"),
	skipAddingFilesFromTsConfig: true,
});

// 读取配置
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
const exposes = config.exposes || {};

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR);
}

// 递归解析类型
function parseTypeRecursive(type: Type, visited = new Set()): any {
	const key = type.getText();

	if (visited.has(key)) return key;
	visited.add(key);

	if (type.isString()) return "string";
	if (type.isNumber()) return "number";
	if (type.isBoolean()) return "boolean";
	if (type.isUndefined()) return "undefined";
	if (type.isNull()) return "null";
	if (type.isAny()) return "any";
	if (type.isUnknown()) return "unknown";
	if (type.isVoid()) return "void";

	if (type.isArray()) {
		const elemType = type.getArrayElementType();
		return [elemType ? parseTypeRecursive(elemType, visited) : "any"];
	}

	if (type.isUnion()) {
		return type.getUnionTypes().map((t) => parseTypeRecursive(t, visited));
	}

	if (type.isIntersection()) {
		return Object.assign({}, ...type.getIntersectionTypes().map((t) => parseTypeRecursive(t, visited)));
	}

	if (type.getCallSignatures().length > 0) {
		return type.getCallSignatures()[0].getDeclaration().getText();
	}

	if (type.isObject() && type.getProperties().length > 0) {
		const obj: Record<string, any> = {};
		for (const prop of type.getProperties()) {
			const decl = prop.getValueDeclaration();
			if (!decl) continue;
			obj[prop.getName()] = parseTypeRecursive(prop.getTypeAtLocation(decl), visited);
		}
		return obj;
	}

	return key; // fallback 类型名
}

// 遍历所有组件定义
for (const [exposeName, relativePath] of Object.entries(exposes)) {
	const componentName = exposeName.replace("./", "");
	const absPath = path.resolve(ROOT_DIR, relativePath as string);

	const entryCandidates = [absPath, absPath + ".ts", absPath + ".tsx", path.join(absPath, "index.ts"), path.join(absPath, "index.tsx")];
	const entryFile = entryCandidates.find(fs.existsSync);
	if (!entryFile) {
		console.warn("❌ 找不到入口文件:", componentName);
		continue;
	}

	const sourceFile = project.addSourceFileAtPath(entryFile);
	const typeAlias = sourceFile.getTypeAlias("Tinputprops");
	if (!typeAlias) {
		console.log(`⏭️ 跳过 ${componentName}，未定义 Tinputprops`);
		continue;
	}

	const result: Record<string, any> = {};
	const type = typeAlias.getType();
	for (const prop of type.getProperties()) {
		const name = prop.getName();
		const declaration = prop.getValueDeclaration();
		if (!declaration) continue;
		const propType = prop.getTypeAtLocation(declaration);
		result[name] = parseTypeRecursive(propType);
	}

	const outputPath = path.join(OUTPUT_DIR, componentName + ".json");
	fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
	console.log("✅ 输出成功:", outputPath);
}

console.log("🎉 所有组件处理完成！");
