interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string;

  /**
   * 应用logo
   */
  VITE_APP_LOGO: string;

  /**
   * 开发环境
   */
  VITE_APP_ENV: string;

  /**
   * 应用端口
   */
  VITE_APP_PORT: number;

  /**
   * 请求地址
   */
  VITE_APP_API_HOST: string;
  
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
