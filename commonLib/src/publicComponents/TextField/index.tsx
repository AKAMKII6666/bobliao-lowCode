import React, { useState, useEffect, forwardRef } from "react";
import type { ForwardedRef } from "react";
import { TextField as MUITextField, IconButton, InputAdornment, TextFieldProps } from "@mui/material";

export type ITextFieldProps = TextFieldProps & {};

//往外面暴露统一名称的属性对象，用于生成低代码平台属性JSON schema
export type Tinputprops = ITextFieldProps;

const TextField = (props: TextFieldProps) => {
	return <MUITextField {...props} />;
};

//为防止在编译和混淆后，无法识别组件名称，所以在这里显示定义名称
TextField.displayName = "TextField";
export default TextField;
