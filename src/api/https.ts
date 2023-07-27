import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';


// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
     //在请求之前做一些事
    return config;
  },
  (error: any) => {
     //请求错误的时候做一些事
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
     //对返回的数据做一些处理
    return response;
  },
  (error: any) => {
     //对返回的错误做一些处理
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;