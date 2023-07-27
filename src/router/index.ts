import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      name:"Login"
    },
    // {
    //   path: "/404",
    //   component: () => import("@/views/error-page/404.vue"),
    //   name:"404"
    // },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          name: "Dashboard",
        },
      ],
    },
];
  
/**
 * 创建路由
 */
 const router = createRouter({
    history: createWebHistory("/"),
    routes: constantRoutes as RouteRecordRaw[],
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });
  
  /**
   * 重置路由
   */
  export function resetRouter() {
    router.replace({ path: "/login" });
  }
  
export default router;
  