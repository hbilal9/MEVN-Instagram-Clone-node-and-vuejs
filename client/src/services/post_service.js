import {http} from './http_service';

export function fetchTimelinePosts() {
    return http().get(`/get-timeline-posts`);
}

export function fetchMyPosts() {
    return http().get(`/get-my-posts`);
}