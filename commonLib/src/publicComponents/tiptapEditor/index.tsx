/**
 * 廖力编写
 * 模块名称：
 * 模块说明：
 * 编写时间：
 */
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, FC, ReactElement, useCallback } from "react";

import {
	ImageNodeAttributes,
	LinkBubbleMenu,
	MenuButton,
	RichTextEditor,
	RichTextReadOnly,
	TableBubbleMenu,
	insertImages,
	type RichTextEditorRef,
} from "mui-tiptap";
import useExtensions from "./useExtensions";
import EditorMenuControls from "./EditorMenuControls";
import { Editor, EditorOptions } from "@tiptap/core";

/**
 * 传入参数
 */
export interface iprops {
	/* 输入值 */
	value: string;
	/* 更改值的时候 */
	onChange: (value: string) => void;
	/* 图片上传 */
	onImageUpload: (files: File[]) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>;
	onBlur: (e: any) => void;
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = iprops;

const TipTapRichTextEditor: FC<iprops> = ({ value, onChange, onBlur, onImageUpload }): ReactElement => {
	//===============useHooks=================
	const extensions = useExtensions({
		placeholder: "在此键入文章内容..",
	});

	//===============state====================
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isEditable, setIsEditable] = useState(true);
	const [showMenuBar, setShowMenuBar] = useState(true);

	//===============static===================

	//===============ref======================
	const rteRef = useRef<RichTextEditorRef | null>(null);
	const MutationObserverRef = useRef<MutationObserver | null>(null);

	//===============function=================

	//自己创建一个MutationObserver来观察其中的节点和文本变动
	const createMutationObserver = function () {
		MutationObserverRef.current = new MutationObserver(function (mutations) {
			if (rteRef.current !== null) {
				let val = rteRef!.current!.editor!.getHTML()!;
				onChange(rteRef!.current!.editor!.getHTML()!);
			}
		});

		if (rteRef.current !== null) {
			//直接监听编辑器中的内容变化，有变化就直接取出其中的html并响应上面的onchange
			MutationObserverRef.current.observe(rteRef!.current!.editor!.view.dom, {
				childList: true,
				subtree: true,
				characterData: true,
			});
		}
	};

	/**
	 * 将文件列表转换成文件对象
	 * @param fileList 文件列表 就是文件路径
	 * @returns
	 */
	function fileListToImageFiles(fileList: FileList): File[] {
		// You may want to use a package like attr-accept
		// (https://www.npmjs.com/package/attr-accept) to restrict to certain file
		// types.
		return Array.from(fileList).filter((file) => {
			const mimeType = (file.type || "").toLowerCase();
			return mimeType.startsWith("image/");
		});
	}

	//插入图片上传中的占位符
	const insertPlaceholderImage = (editor: Editor, id: string) => {
		debugger;
		editor
			.chain()
			.focus()
			.insertContentAt(editor.state.selection.anchor, {
				type: "image",
				attrs: {
					src: "https://mithril-trinity.oss-cn-beijing.aliyuncs.com/swythtml/imgs/__loading__.svg", // 你的 loading 占位图地址
					"data-id": id, // 临时标识符，用于后续替换
				},
			})
			.run();
	};

	const removePlaceholderImage = (editor: Editor, id: string) => {
		const { tr, doc } = editor.state;
		doc.descendants((node, pos) => {
			if (node.type.name === "image" && node.attrs["data-id"] === id) {
				tr.delete(pos, pos + node.nodeSize);
				return false;
			}
			return true;
		});
		editor.view.dispatch(tr);
	};

	/**
	 * 插入图片的处理函数
	 */
	const handleNewImageFiles = useCallback(async function (files: File[], insertPosition?: number) {
		if (!rteRef.current?.editor) {
			return;
		}
		insertPlaceholderImage(rteRef.current!.editor, "temp-loading-img-id");

		/* ***在这里处理上传图片** */
		//为了演示，我们没有服务器来上传文件，
		//因此，我们将把每个对象转换为本地“临时”对象URL。
		//这在生产环境中不会正常存在。你应该
		//而是将图像文件上传到服务器，或者转换
		//如果您想直接对图像数据进行编码，请将图像转换为bas64
		//进入编辑器内容，尽管这会使编辑器内容非常
		//大。您可能希望在此处使用与以下相同的上传功能
		//对于MenuButtonImageUpload `onUploadFiles`道具。
		/* ***在这里处理上传图片** */
		const attributesForImageFiles = await onImageUpload(files);
		removePlaceholderImage(rteRef.current!.editor, "temp-loading-img-id");
		console.log(attributesForImageFiles);
		insertImages({
			images: attributesForImageFiles as ImageNodeAttributes[],
			editor: rteRef.current.editor,
			position: insertPosition,
		});
	}, []);

	/**
	 * 拖动上传图片
	 */
	const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> = useCallback(
		function (view, event, _slice, _moved) {
			if (!(event instanceof DragEvent) || !event.dataTransfer) {
				return false;
			}

			const imageFiles = fileListToImageFiles(event.dataTransfer.files);
			if (imageFiles.length > 0) {
				const insertPosition = view.posAtCoords({
					left: event.clientX,
					top: event.clientY,
				})?.pos;

				handleNewImageFiles(imageFiles, insertPosition);

				// Return true to treat the event as handled. We call preventDefault
				// ourselves for good measure.
				event.preventDefault();
				return true;
			}

			return false;
		},
		[handleNewImageFiles]
	);

	/**
	 * 黏贴上传文件
	 */
	const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> = useCallback(
		function (_view, event, _slice) {
			if (!event.clipboardData) {
				return false;
			}

			const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
			if (pastedImageFiles.length > 0) {
				handleNewImageFiles(pastedImageFiles);
				// Return true to mark the paste event as handled. This can for
				// instance prevent redundant copies of the same image showing up,
				// like if you right-click and copy an image from within the editor
				// (in which case it will be added to the clipboard both as a file and
				// as HTML, which Tiptap would otherwise separately parse.)
				return true;
			}

			// We return false here to allow the standard paste-handler to run.
			return false;
		},
		[handleNewImageFiles]
	);

	//===============effects==================
	useEffect(
		function (): ReturnType<React.EffectCallback> {
			if (isMounted === false) {
				setIsMounted(true);

				//当组件装载好的情况下，就开启轮询看看这个editor有没有初始化好
				let timeout = setInterval(() => {
					if (rteRef.current !== null) {
						createMutationObserver();
						clearInterval(timeout);
					}
				}, 500);
			}
		},
		[isMounted]
	);

	useEffect(function (): ReturnType<React.EffectCallback> {
		return function (): void {
			setIsMounted(false);
			if (MutationObserverRef.current !== null) {
				MutationObserverRef.current.disconnect();
				MutationObserverRef.current = null;
			}
		};
	}, []);

	//不用强行设置内容了
	//每次在editor中编辑内容后，再回写内容会导致editor重置，没必要，
	//useEffect(
	//    function (): ReturnType<React.EffectCallback> {
	//        try {
	//            //设置内容
	//            //rteRef.current!.editor!.commands.setContent(value);
	//        } catch (e) {}
	//    },
	//    [value]
	//);

	return (
		<>
			<RichTextEditor
				ref={rteRef}
				onBlur={function (e) {
					onBlur(e.event);
				}}
				extensions={extensions}
				content={value}
				editable={true}
				editorProps={{
					handleDrop: handleDrop,
					handlePaste: handlePaste,
				}}
				renderControls={() => (
					<EditorMenuControls
						onImageUpload={async function () {
							insertPlaceholderImage(rteRef.current!.editor, "temp-loading-img-id");

							let res = await onImageUpload.apply(null, arguments);
							removePlaceholderImage(rteRef.current!.editor, "temp-loading-img-id");
							return res;
						}}
					/>
				)}
				RichTextFieldProps={{
					// The "outlined" variant is the default (shown here only as
					// example), but can be changed to "standard" to remove the outlined
					// field border from the editor
					variant: "outlined",
					MenuBarProps: {
						hide: !showMenuBar,
					},
				}}
			/>
		</>
	);
};
//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
TipTapRichTextEditor.displayName = "TipTapRichTextEditor";
export default TipTapRichTextEditor;
