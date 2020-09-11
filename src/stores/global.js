// State
import API from '../config/api';

const saveAlert = () => {
    return {
        notification: {
            title: 'Datos guardados con éxito',
            content: '',
            error: false,
            view: false,
            color: false,
        },
        loading: false,
        capa: false,
    }
}
const dataModals = () => {
    return {
        value: false,
        title: null,
        variant: null,
        actions: null,
        data: [],
    }
}
export const state = {
    dataModals: dataModals(),
    saveAlert: saveAlert(),
    listas: {
        lista_identificacion: [],
        lista_genero: [],
        lista_carreras: [],
    },

    url: window.location.origin.replace(":8080", ":8000")
};

// Getters
export const getters = {
    listasGetters: (state, getters) => (lista, query) => {
        try {
            return _.filter(state[lista], query)
        } catch (e) { console.log('error en listasGetters' + e) }
    },
};
// Mutations
export const mutations = {
    assignListas(state, { data, callback }) {
        try {
            Object.assign(state.listas, data);
            callback(true)
        } catch (e) { console.log('error en globalStore/mutation/assignListas,', error) }
    },
    assingGlobalState(state, { data, callback }) {
        try {
            Object.assign(state[data[0]], data[1])
            callback(true)
        } catch (e) {
            console.log(e)
        }
    },
};
// Actions
export const actions = {
    async getListas({ commit, state }, config) {
        return new Promise((resolve, reject) => {
            API
                .get('get_listas', { params: { data: 'listas' } })
                .then(async response => {
                    commit('assignListas', { data: response.data, callback: resolve })
                    resolve(true)
                }, error => {
                    reject(error)
                })
        })
    },
    assingGlobalState({ commit }, data) {
        return new Promise((resolve) => {
            commit('assingGlobalState', { data: data, callback: resolve })
        })
    },
};