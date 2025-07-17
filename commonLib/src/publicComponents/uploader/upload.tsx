import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import type { UploadProps } from "antd";
import { message, Modal, Upload } from "antd";
import type { RcFile, UploadFile, UploadFileStatus } from "antd/es/upload/interface";
import toast from "react-hot-toast";

import { UploadChangeParam } from "antd/lib/upload";

interface PropsType {
	/**
	 * 文件列表
	 */
	files: any[];
	/**
	 * 消息
	 */
	msg?: string;
	/**
	 * 类型限制
	 */
	limitType?: string;
	/**
	 * 文件数量限制
	 */
	limit?: number;
	/**
	 * 样式定制
	 */
	style?: CSSProperties;
	/**
	 * 是否显示上传列表
	 */
	isShowUploadList?: boolean;
	/**
	 * 是否只能上传图片
	 */
	limitImg?: boolean;
	/**
	 * 是否启用
	 */
	disabled?: boolean;
	/**
	 * 文件上传之后的回调
	 * @returns
	 */
	beforeUpload?: () => void;
	/**
	 * 子对象
	 */
	children?: ReactElement | ReactElement[] | null | undefined;
	/**
	 * 当文件列表发生改变的时候
	 * @param param
	 * @returns
	 */
	onFilesChange: (param: any[]) => void;
	/**
	 * 当上传状态发生改变的时候
	 * @param param
	 * @returns
	 */
	onchangeState?: (param: UploadChangeParam<UploadFile<any>>) => void;
	/**
	 * 附加样式
	 */
	className?: string;
	/**
	 * 上传时接受的文件类型
	 */
	accept?: any;
	/**
	 * 上传用的url地址
	 */
	action?: string;
	/**
	 * 上传时请求时用的header
	 */
	headers?: { [property: string]: any };
}

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = PropsType;

// 图片压缩函数
const compressImg = (file: RcFile): any => {
	var fileSize = file["size"] / 1024 / 1024;
	var read = new FileReader();
	read.readAsDataURL(file);
	return new Promise(function (resolve, reject) {
		try {
			read.onload = function (e: any) {
				var img = new Image();
				img.src = e.target.result;
				img.onload = function () {
					// 默认按比例压缩
					var w = img.width;
					var h = img.height;
					// 生成canvas
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					var base64;
					// 创建属性节点
					canvas.setAttribute("width", w.toString());
					canvas.setAttribute("height", h.toString());
					if (ctx) {
						ctx.drawImage(img, 0, 0, w, h);
					}
					if (fileSize > 2) {
						// 如果图片超过2m 那么压缩0.2
						base64 = canvas.toDataURL(file["type"], 0.2);
					}
					resolve(base64);
				};
			};
		} catch (e) {
			reject(e);
		}
	});
};

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const UploadFile = ({
	limit,
	limitType,
	files,
	limitImg = false,
	disabled = false,
	onFilesChange,
	beforeUpload,
	style = {},
	msg = "点击上传附件",
	children,
	isShowUploadList = true,
	onchangeState = (info) => {},
	className = "",
	accept,
	action = "",
	headers = {},
}: PropsType) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	const handlePreview = async (file: UploadFile) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
		if (!isJpgOrPng) {
			message.success(`${file.name}文件不允许预览!`);
			return;
		}
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
	};

	const handleDownload = async (file: UploadFile) => {
		if (file.url) {
			saveAs(file.url, file.name);
		}
	};

	const handleCancel = () => setPreviewOpen(false);
	let orgCode = localStorage.getItem("org_code") as string;
	let accessToken = localStorage.getItem("serviceToken");

	const props: UploadProps = {
		accept: accept,
		name: "file",
		disabled,
		data: {
			type: 0,
		},
		action: action,
		headers: headers,
		onChange(info) {
			const { file, fileList } = info;
			//新的逻辑，所有文件大于10m统一不让上传
			var fileSize = file["size"] / 1024 / 1024;
			if (fileSize > 10) {
				message.error(`附件不可超过10MB!`);
				return;
			}
			onchangeState(info);
			if (file.status === "done") {
				const { code } = file.response;
				if (code === 200) {
					message.success(`${file.name} 文件上传成功了!`);
				} else {
					message.error(`${file.name} 文件上传失败了!`);
				}
				const data = fileList.map((el) => {
					let status: UploadFileStatus = el.response ? (el.response.code === 200 ? "done" : "error") : (el.status as UploadFileStatus);
					return {
						uid: el.uid,
						name: el.name,
						status,
						type: el.type,
						url: el.response?.data?.url || el.url,
					};
				});
				setFileList(data);
				onFilesChange(data);

				return;
			} else if (file.status === "error") {
				message.error(`${file.name} 文件上传失败了!`);
				const data = fileList.map((el) => {
					let status: UploadFileStatus = el.status ? el.status : "error";
					return {
						uid: el.uid,
						name: el.name,
						status,
						type: el.type,
						url: el.response?.data?.url || el.url,
					};
				});
				setFileList(data);
				onFilesChange(data);
				return;
			}
			onFilesChange(fileList);
			setFileList(fileList);
		},
		beforeUpload(file) {
			if (typeof limit !== "undefined" && !isNaN(Number(limit)) && fileList.length >= limit) {
				if (limit !== 1) {
					toast.error(`最多只能上传${limit}个文件，请删除后重新上传！`);
					return false;
				}
			}
			if (limitType && file.type !== limitType) {
				toast.error(`只能上传${limitType}类型的文件，当前上传的文件类型为${file.type}，请删除后重新上传！`);
				return false;
			}
			if (limitImg) {
				if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
					toast.error(`只能上传图片，请删除后重新上传！`);
					return false;
				}
			}

			if (beforeUpload) {
				beforeUpload();
			}

			//return file;
			//老的逻辑是说，大于10m的图片就压缩
			//大于10m的其它文件就拒绝
			/* var fileSize = file["size"] / 1024 / 1024; */
			return new Promise(async (resolve, reject) => {
				const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
				if (isJpgOrPng) {
					const newFile = await compressImg(file);
					// var img = new Image();
					// img.src = newFile;
					// document.body.appendChild(img);
					resolve(newFile);
					return;
				} else {
					resolve(file);
				}
			});
		},
		fileList,
	};

	useEffect(() => {
		if (Array.isArray(files)) {
			setFileList(files);
		} else {
			setFileList([]);
		}
	}, [files]);

	return (
		<>
			<Upload
				{...props}
				style={style}
				className={className}
				listType="picture-card"
				showUploadList={(function () {
					if (isShowUploadList) {
						return {
							showDownloadIcon: true,
						};
					}
					return false;
				})()}
				maxCount={limit}
				onPreview={handlePreview}
				onDownload={handleDownload}
			>
				<>
					{(function () {
						if (typeof children !== "undefined" && children !== null) {
							return children;
						}
						return (
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>{msg}</div>
							</div>
						);
					})()}
				</>
			</Upload>

			<Modal open={previewOpen} title={previewTitle} footer={null} width={900} onCancel={handleCancel} zIndex={9999}>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
};

export default UploadFile;
