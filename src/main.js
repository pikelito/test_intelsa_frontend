/*
|-------------------------------------------------------------------------------
| Vendors
|-------------------------------------------------------------------------------
|
| Some fundamental vendor libraries.
|
*/
import Vue from "vue"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import axios from "axios"
import _ from "lodash"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { CardPlugin } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(CardPlugin)

Vue.prototype.$request = axios;
Vue.directive('ripple', Ripple);

import router from "./services/router";
import store from "./services/store";
import SwNotification from '@/components/notification/swnotification.vue';
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate';
import './mixins/validate.js';

Vue.mixin({
    components: {
        SwNotification,
        ValidationObserver,
        ValidationProvider
    },
})

window.app = new Vue({
    store,
    router,
    render() {
        return <router-view/> ;
    }
}).$mount("#app");
