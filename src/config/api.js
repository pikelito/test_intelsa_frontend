import axios from 'axios';
import baseURL from './baseURL'

window.axios = axios;
axios.defaults.baseURL = baseURL + '/api';
if (window.localStorage.getItem("access_token")) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("access_token");
}
axios.defaults.params = {};

//Before send
axios.interceptors.request.use(function(config) {
    return config;
});


export default axios