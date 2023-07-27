import vue from "@vitejs/plugin-vue";
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";

import path from "path";
const pathSrc = path.resolve(__dirname, "src");

// 移动端自适应
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin";

// 自动导入 ref 以及 组件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// 自动导入svg图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// 设置标题与logo
import { createHtmlPlugin } from "vite-plugin-html";
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_APP_ENV === "production" ? "/" : "/",
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: false, // 运行是否自动打开浏览器
      proxy: {
        // 反向代理解决跨域
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_API_HOST,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""), // 替换 /dev-api 为 target 接口地址
        },
      },
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            // 设置网页标题,logo
            logo: getViteEnv(mode, "VITE_APP_LOGO"),
            title: getViteEnv(mode, "VITE_APP_TITLE"),
          },
        },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
    ],

    css: {
      // scss
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
      // 移动端自适应
      postcss: {
        plugins: [
          postcsspxtoviewport({
            // (String) 需要转换的单位，默认为"px"
            unitToConvert: "px",
            // (Number) 设计稿的视口宽度
            viewportWidth: 1980,
            // (Number) 单位转换后保留的精度
            unitPrecision: 5,
            /**
             * (Array) 能转化为vw的属性列表
             * 传入特定的CSS属性；
             * 可以传入通配符""去匹配所有属性，例如：['']；
             * 在属性的前或后添加"*",可以匹配特定的属性. (例如['position'] 会匹配 background-position-y)
             * 在特定属性前加 "!"，将不转换该属性的单位 . 例如: ['*', '!letter-spacing']，将不转换letter-spacing
             * "!" 和 ""可以组合使用， 例如: ['', '!font*']，将不转换font-size以及font-weight等属性
             */
            propList: ["*"],
            // (String) 希望使用的视口单位
            viewportUnit: "vw",
            // (String) 字体使用的视口单位
            fontViewportUnit: "vw",
            /**
             * (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
             * 如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配：例如 selectorBlackList 为 ['body'] 的话， 那么 .body-class 就会被忽略
             * 如果传入的值为正则表达式的话，那么就会依据CSS选择器是否匹配该正则：例如 selectorBlackList 为 [/^body$/] , 那么 body 会被忽略，而 .body 不会
             */
            selectorBlackList: [],
            // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            minPixelValue: 1,
            // (Boolean) 媒体查询里的单位是否需要转换单位
            mediaQuery: false,
            // (Boolean) 是否直接更换属性值，而不添加备用属性
            replace: true,
            /**
             * (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
             * 如果值是一个正则表达式，那么匹配这个正则的文件会被忽略
             * 如果传入的值是一个数组，那么数组里的值必须为正则
             */
            exclude: [/node_modules/],
            /**
             * (Array or Regexp) 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
             * 如果值是一个正则表达式，将包含匹配的文件，否则将排除该文件             * 如果传入的值是一个数组，那么数组里的值必须为正则
             */
            include: [/src/],
            // (Boolean) 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscape: false,
            // (String) 横屏时使用的单位
            landscapeUnit: "vw",
            // (Number) 横屏时使用的视口宽度
            landscapeWidth: 568,
          }),
        ],
      },
    },
  };
});
