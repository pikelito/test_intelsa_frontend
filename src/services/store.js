/**
 * Vuex modules
 * @link https://vuex.vuejs.org/guide/modules.html
 */
import Vue from "vue";
import Vuex from "vuex";
import stores from "@/stores";
Vue.use(Vuex);

const MODULE_DEFAULT = {
  namespaced: true,

  mutations: {
    update(state, props) {
      for (let key in props) {
        if (state.hasOwnProperty(key)) {
          state[key] = props[key];
        }
      }
    }
  },

  actions: {
    update({ commit }, props) {
      commit("update", props);
    }
  }
};

(function mixin(modules) {
  Object.keys(modules).forEach(name => {
    let module = modules[name];
    module = Object.assign({}, MODULE_DEFAULT, module);
    modules[name] = module;
    if (module.modules) {
      mixin(module.modules);
    }
  });
})(stores);

const store = new Vuex.Store({
  modules: stores
});

export default store;
