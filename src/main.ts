import { createApp } from 'vue'

// 清除默认样式
import './styles/base.css';

// 路由守卫规则
import './permission';

// 引入svg图标
import 'virtual:svg-icons-register';

// 引入pinia
import store from './store'

// 引入router
import router from "@/router";

import App from './App.vue'

const app = createApp(App);

app.use(store).use(router).mount('#app')
