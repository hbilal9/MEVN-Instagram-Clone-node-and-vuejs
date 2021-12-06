import axios from 'axios';
import store from '../store.js';
// import * as authService from './auth_service';

export function http() {
    return axios.create({
        baseURL: store.state.apiURL,
        headers: {
            "Content-Type" : "application/json",
            Authorization : "Bearer " + localStorage.getItem('access_token')
        }
    })
}

export function httpFile() {
    return axios.create({
        baseURL: store.state.apiURL,
        headers: {
            "Content-Type" : "multipart/form-data",
            Authorization : "Bearer " + localStorage.getItem('access_token')
        }
    })
}