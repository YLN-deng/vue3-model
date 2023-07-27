import router from "@/router";

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (!token && to.path !== "/login") {
        next({ path: "/login" })
    } else if (token && to.path === "/login") {
        next({ path: "/" })
    } else {
        next()
    }
});
