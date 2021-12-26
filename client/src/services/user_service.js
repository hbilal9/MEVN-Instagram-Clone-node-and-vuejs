import {http} from './http_service';

export function getProfileByUsername(username){
    return http().get(`/get-user-profile/${username}`)
}

export function getPostsByUsername(username){
    return http().get(`/get-user-posts/${username}`)
}