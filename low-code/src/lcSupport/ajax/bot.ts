/* 向ai调用生成布局的接口 */

import { GPT_PROMPT_TEMPLATE } from "./promt";
import { SYS_AIAPIURL } from "./setting";

/* 生成布局 */
export const Api_generateLayout = async (content: string, resCallBack: (content: string) => void, doneCallBack: () => void): Promise<AbortController> => {
	let currentController = new AbortController();

	fetch(`${SYS_AIAPIURL}/v1/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt: `你是一个 JSON 结构生成器，每次只输出完整合法的 JSON，不记住之前的任何对话。你是一个熟悉低代码布局系统的专家，善于将自然语言解析成 renderTree 结构。

请根据以下自然语言描述，生成一个 ITreeNode 类型的页面布局结构，输出 JSON 格式：
${content}

请将布局结构用完整的 ITreeNode 格式返回，不要中途停止，不需要解释说明,直接生成json字符串，只返回符合 JSON 标准的内容，必须使用英文双引号，不允许出现单引号或未闭合的字段。禁止出现任何解释、说明、空行或换行，只输出一个完整的 JSON 字符串。`,
			temperature: 0.95,
			top_p: 0.7,
			top_k: 20,
			typical_p: 1,
			repetition_penalty: 1.1,
			max_tokens: 8192,
			stream: true,
		}),
		signal: currentController.signal,
	})
		.then((response) => {
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let fullResponse = "";
			function readStream() {
				return reader.read().then(({ done, value }) => {
					if (done) {
						console.log("完整流式响应:", fullResponse);
						doneCallBack();
						return;
					}

					const chunk = decoder.decode(value);
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const data = line.slice(6);
							if (data === "[DONE]") {
								return;
							}
							try {
								const parsed = JSON.parse(data);
								// 修改这里：使用 text 字段而不是 delta.content
								if (parsed.choices && parsed.choices[0] && parsed.choices[0].text) {
									fullResponse += parsed.choices[0].text;
									console.log("当前完整响应:", fullResponse);

									resCallBack(fullResponse);
								}
							} catch (e) {
								console.log("解析错误:", data);
							}
						}
					}

					return readStream();
				});
			}

			return readStream();
		})
		.catch((error) => {
			console.error("流式请求错误:", error);
		});

	return currentController;
};

const apiKey = "sk-bbe1d30dbe7c446bb16c2942d65a73f7";

/* 调用DeepSeek API生成布局 - 新增 */
export const Api_generateLayoutWithChatGPT = async (
	content: string,
	resCallBack: (content: string) => void,
	doneCallBack: () => void,
	options?: {
		model?: string;
		temperature?: number;
		maxTokens?: number;
		apiKey?: string;
	}
): Promise<AbortController> => {
	let currentController = new AbortController();

	// 默认配置
	const defaultOptions = {
		model: "deepseek-chat",
		temperature: 0.7,
		maxTokens: 4096,
		apiKey: apiKey, // 使用默认API key
	};

	const finalOptions = { ...defaultOptions, ...options };

	// 专业的低代码布局生成prompt
	const systemPrompt = GPT_PROMPT_TEMPLATE.replace("---[在这里输入用户的具体需求]---", content);

	fetch("https://api.deepseek.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${finalOptions.apiKey}`,
		},
		body: JSON.stringify({
			model: finalOptions.model,
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: `${content} \n 请将布局结构用完整的 ITreeNode 格式返回，不要中途停止，不需要解释说明,直接生成json字符串，只返回符合 JSON 标准的内容，必须使用英文双引号，不允许出现单引号或未闭合的字段。禁止出现任何解释、说明、空行或换行，只输出一个完整的 JSON 字符串。`,
				},
			],
			temperature: finalOptions.temperature,
			max_tokens: finalOptions.maxTokens,
			stream: true,
		}),
		signal: currentController.signal,
	})
		.then((response) => {
			if (!response.ok) {
				if (response.status === 402) {
					console.error("DeepSeek API配额不足，请检查账户余额");
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let fullResponse = "";

			function readStream() {
				return reader.read().then(({ done, value }) => {
					if (done) {
						console.log("DeepSeek完整流式响应:", fullResponse);
						doneCallBack();
						return;
					}

					const chunk = decoder.decode(value);
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							const data = line.slice(6);
							if (data === "[DONE]") {
								console.log("DeepSeek完整流式响应:", fullResponse);
								doneCallBack();
								return;
							}
							try {
								const parsed = JSON.parse(data);
								if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
									fullResponse += parsed.choices[0].delta.content;
									console.log("DeepSeek当前完整响应:", fullResponse);
									resCallBack(fullResponse);
								}
							} catch (e) {
								console.log("DeepSeek解析错误:", data);
							}
						}
					}

					return readStream();
				});
			}

			return readStream();
		})
		.catch((error) => {
			console.error("DeepSeek流式请求错误:", error);
			// 如果DeepSeek API失败，回退到本地API
			console.log("回退到本地API...");
			Api_generateLayout(content, resCallBack, doneCallBack);
			doneCallBack();
		});

	return currentController;
};

/* 调用DeepSeek API生成布局 - 同步版本 */
export const Api_generateLayoutWithChatGPTSync = async (
	content: string,
	options?: {
		model?: string;
		temperature?: number;
		maxTokens?: number;
		apiKey?: string;
	}
): Promise<string> => {
	// 默认配置
	const defaultOptions = {
		model: "deepseek-chat",
		temperature: 0.7,
		maxTokens: 4096,
		apiKey: apiKey, // 使用默认API key
	};

	const finalOptions = { ...defaultOptions, ...options };

	// 专业的低代码布局生成prompt
	const systemPrompt = GPT_PROMPT_TEMPLATE.replace("---[在这里输入用户的具体需求]---", content);

	try {
		const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${finalOptions.apiKey}`,
			},
			body: JSON.stringify({
				model: finalOptions.model,
				messages: [
					{
						role: "system",
						content: systemPrompt,
					},
					{
						role: "user",
						content: `${content} \n 请将布局结构用完整的 ITreeNode 格式返回，不要中途停止，不需要解释说明,直接生成json字符串，只返回符合 JSON 标准的内容，必须使用英文双引号，不允许出现单引号或未闭合的字段。禁止出现任何解释、说明、空行或换行，只输出一个完整的 JSON 字符串。`,
					},
				],
				temperature: finalOptions.temperature,
				max_tokens: finalOptions.maxTokens,
				stream: false, // 同步版本不使用流式
			}),
		});

		if (!response.ok) {
			if (response.status === 402) {
				console.error("DeepSeek API配额不足，请检查账户余额");
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
			console.log("DeepSeek同步响应:", data.choices[0].message.content);
			return data.choices[0].message.content;
		} else {
			throw new Error("DeepSeek API响应格式错误");
		}
	} catch (error) {
		console.error("DeepSeek同步请求错误:", error);
		// 如果DeepSeek API失败，回退到本地API
		console.log("回退到本地API...");
		throw error; // 让调用者处理错误
	}
};

/* 停止生成布局 */
export const Api_stopGenerateLayout = async () => {
	fetch(`${SYS_AIAPIURL}/v1/chat/completions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
