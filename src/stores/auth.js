  import API from './../config/api';
  import router from '@/services/router.js';

  function initialState() {
      let access_token, expires_at = null;
      let logged = false;
      if (window.localStorage.getItem('access_token') && window.localStorage.getItem('expires_at')) {
          access_token = window.localStorage.getItem('access_token');
          expires_at = window.localStorage.getItem('expires_at');
          logged = true;
      }
      return {
          access_token: access_token,
          expires_at: expires_at,
          user: null,
          logged: logged,
      }
  }

  export const state = initialState()

  export const actions = {
      login({ commit }, userInput) {
          return new Promise((resolve, reject) => {
              API.post('auth/login', userInput)
                  .then(response => {
                      if (response.data.access_token) {
                          commit('SET_USER', response.data)
                          commit('SET_TOKEN', response.data)
                      }
                      resolve(response);
                  }).catch(e => {
                      reject(e)
                  })
          })
      },
      logout({ state, commit }) {
          if (state.access_token) {
              API.post('auth/logout')
                  .finally(() => {
                      commit('SET_USER', {})
                      commit('SET_TOKEN', {})
                      router.push('/auth/login');
                  })
          } else {
              commit('SET_USER', {})
              commit('SET_TOKEN', {})
              router.push('/auth/login');
          }
      },
      register({ commit }, userInput) {
          return new Promise((resolve, reject) => {
              API.post('auth/register', userInput)
                  .then(response => {
                      if (response.data.access_token) {
                          commit('SET_USER', response.data)
                          commit('SET_TOKEN', response.data)
                      }
                      resolve(response);
                  }).catch(error => {
                      reject(error)
                  })
          })
      },
      getMyUser({ commit, dispatch }) {
          return new Promise((resolve, reject) => {
              API.post('auth/me')
                  .then(response => {
                      if (response.data) {
                          commit('SET_USER', { user: response.data })
                      }
                      resolve(response);
                  }).catch(error => {
                      dispatch('logout')
                      reject(error)
                  })
          })
      },
  };

  export const getters = {
      user(state) {
          return state.user;
      },
      logged(state) {
          return state.logged;
      },
  };

  export const mutations = {
      RESET_STATE(state) {
          Object.assign(state, initialState())
      },
      SET_USER(state, { user = null }) {
          state.user = user;
          if (user) {
              state.logged = true;
          } else {
              state.logged = false;
          }
      },
      SET_TOKEN(state, { access_token = '', expires_at = '' }) {
          if (access_token && expires_at) {
              state.access_token = access_token;
              state.expires_at = expires_at;

              API.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

              window.localStorage.setItem('access_token', state.access_token);
              window.localStorage.setItem('expires_at', state.expires_at);
          } else {
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('expires_at');

              delete API.defaults.headers.common['Authorization']

              Object.assign(state, initialState())
          }
      }
  };