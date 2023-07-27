import request from "@/api/https";
import { AxiosPromise } from "axios";
import { LoginData } from "./types";

export default {
  loginApi(formData: LoginData): AxiosPromise<LoginData> {
    return request({
      url: "/login",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
