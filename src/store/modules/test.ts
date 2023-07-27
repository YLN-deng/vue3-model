import { defineStore } from "pinia";
import piniaPersistConfig from "@/utils/persist";

// 定义属性类
interface TestState {
  test: boolean;
  token: string;
}

// 创建变量
const useTestStore = defineStore(
  "test",
  () => {
    const state = reactive<TestState>({
      test: false,
      token: "",
    });

    // 创建方法

    function isTestBool() {
      // 改变test的值
      state.test = !state.test;
    }

    function isTokenSave(token: string) {
      // 保存token
      state.token = token;
    }

    // 导出
    return {
      ...toRefs(state),
      isTestBool,
      isTokenSave,
    };
  },
  {
    //   加入持久化
    persist: piniaPersistConfig("test", ["test","token"]),
  }
);

// 对外暴露
export default useTestStore;
