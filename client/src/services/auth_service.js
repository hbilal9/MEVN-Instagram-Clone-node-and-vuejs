import {http} from './http_service';
import jwt from 'jsonwebtoken';
import store from '../store.js';

export function login(data) {
    return http().post('/login', data)
        .then(response => {
            if (response.status == 200) {
                setToken(response.data)
            }
            return {user: response.data.user};
        })
}

export function register(data) {
    return http().post('/register', data);
}

function setToken(response){
    localStorage.setItem('access_token', response.token);
    store.dispatch('authenticate', response.user);
}

export function isLoggedIn() {
    const token = localStorage.getItem('access_token')
    return token != null;
}

export function getUserRole() {
    const token = localStorage.getItem('access_token')
    const user = jwt.decode(token);
    return user.role;
}

export function logout() {
    localStorage.removeItem('access_token')
}

export function getProfile() {
    return http().get('get-profile');
}

