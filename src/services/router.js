import Vue from "vue";
import Router from "vue-router";
import routes from "../routes/routes";
import store from "./store";
import routerConfig from "../routes/router";
import axios from 'axios';

Vue.use(Router);

const router = new Router({
    ...routerConfig,
    routes: routes
});

let pageLoader = null;
let pageLoaderTimeout = null;

const later = () => {
    if (!pageLoader) {

    }
    pageLoaderTimeout = null;
};

const showPageLoader = () => {
    clearTimeout(pageLoaderTimeout);
    pageLoaderTimeout = setTimeout(later, 200);
};

const hidePageLoader = () => {
    clearTimeout(pageLoaderTimeout);
    pageLoaderTimeout = null;
    if (pageLoader) {
        pageLoader.hide();
        pageLoader = null;
    }
};

router.beforeEach((to, from, next) => {
    if (to.hasOwnProperty('meta') && to.meta.hasOwnProperty('auth') && to.meta.auth && !store.state.authStore.logged) {
        next({ name: 'auth.login' });
    } else {
        next();
    }
});

router.beforeResolve((to, from, next) => {
    next();
});

export default router;