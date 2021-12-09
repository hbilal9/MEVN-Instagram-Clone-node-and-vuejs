import {http} from './http_service';

export function fetchTimelinePosts() {
    return http().get(`/get-timeline-posts`);
}

export function fetchMyPosts() {
    return http().get(`/get-my-posts`);
}

export function createPost(data) {
    return http().post('/create-post', data);
}

export function likePost(data) {
    return http().post('/like-post', data);
}

export function unlikePost(data) {
    return http().post('/unlike-post', data);
}

export function addComment(data) {
    return http().post('/add-comment', data);
}