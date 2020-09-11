import API from '../config/api';
export const state = {
    estudiantes: {},
};

// Getters
export const getters = {

};

// Mutations
export const mutations = {

};
// Actions
export const actions = {
    saveEstudiante({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            API
                .post('estudiantes', data)
                .then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    getEstudiantes({ commit, state }) {
        return new Promise((resolve, reject) => {
            API
                .get('estudiantes')
                .then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    getEstudiante({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            API
                .get('estudiantes/' + data)
                .then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    updateEstudiante({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            API
                .put('estudiantes/' + data.id, data)
                .then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    deleteEstudiante({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            API
                .delete('estudiantes/' + data)
                .then(response => {
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    }
};