import { createPinia } from "pinia"

// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()

// 将插件提供给store实例
store.use(piniaPluginPersistedstate)

export default store
