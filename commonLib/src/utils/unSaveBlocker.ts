import { unstable_usePrompt } from "react-router-dom";

//使用提示框拦截器
export function useUnsavedConfirm(shouldBlock: boolean, message = "你有未保存的更改，确认要离开吗？") {
	unstable_usePrompt({ when: shouldBlock, message: message });
}
