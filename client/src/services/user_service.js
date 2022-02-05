import {http} from './http_service';

export function getAllUsers(){
    return http().get(`/get-all-users`)
}

export function getProfileByUsername(username){
    return http().get(`/get-user-profile/${username}`)
}

export function getPostsByUsername(username){
    return http().get(`/get-user-posts/${username}`)
}

export function followUser(data){
    return http().post(`/follow-user`, data)
}

export function unFollowUser(data){
    return http().post(`/unfollow-user`, data)
}