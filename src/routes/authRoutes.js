import CenterLayout from "@/layouts/center";
import store from '@/services/store'

export default [{
    path: "/auth",
    component: CenterLayout,
    children: [{
        path: "login",
        name: "auth.login",
        component: () =>
            import ( /* webpackChunkName: "auth" */ "@/views/auth/login/index.vue"),
        beforeEnter: (to, from, next) => {
            if (store.state.authStore.logged) {
                next('/estudiantes/lista');
            } else {
                next();
            }
        }
    }, ]
}]