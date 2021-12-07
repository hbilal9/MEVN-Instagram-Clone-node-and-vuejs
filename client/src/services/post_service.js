import {http} from './http_service';

export function fetchTimelinePosts() {
    return http().get(`/get-timeline-posts`);
}