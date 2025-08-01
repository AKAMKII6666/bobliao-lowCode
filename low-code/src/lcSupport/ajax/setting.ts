import { SYS_APIMODE } from "@/config";
let apiUrl = "";
if (SYS_APIMODE === "development") {
	apiUrl = "http://localhost:8080";
} else if (SYS_APIMODE === "production") {
	apiUrl = "https://liaoliresume.com";
}

export const SYS_AIAPIURL = apiUrl;
