<template>
    <div class="container" style="margin-top:6rem;">
        <div class="row">
            <div class="col-12 col-sm-12 col-lg-8 d-flex justify-content-center main-contents mb-2"
                v-for="(post, index) in timeLinePosts" :key="index"
            >
                <div class="card" style="width: 25rem;"
                    :style="index+1 == timeLinePosts.length ? 'margin-bottom: 5rem' : ''"
                >
                    <div class="d-flex justify-content-between">
                        <span class="card-title mt-2 ml-2 d-flex justify-content-left" v-if="post.postedBy">
                            <avatar :size="36" :src="post.postedBy.display_photo" :username="post.postedBy.username"></avatar>
                            <span class="username-text mt-1 ml-2">{{ post.postedBy.username}}</span>
                        </span>
                        <button class="btn">
                            <icon class="header-icon mt-2 mr-2" icon="ellipsis-v"/>
                        </button>
                    </div>
                    <img
                        class="card-img-top"
                        :src="post.img"
                        alt="Card image cap"
                    >
                    <div class="card-body">
                        <p class="card-text">{{post.caption}}</p>
                        <div class="d-flex justify-content-between">
                            <div class="buttons-group">
                                <button class="btn"><icon icon="heart"></icon></button>
                                <button class="btn"><icon icon="comment"></icon></button>
                                <button class="btn"><icon icon="paper-plane"></icon></button>
                            </div>
                            <div class="save-button">
                                <icon icon="bookmark"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-4 sidebar-contents">
                right sidebar
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar';
import * as postService from '../../../services/post_service';
export default {
    components: {
        Avatar,
    },
    data() {
        return {
            timeLinePosts: []
        }
    },
    mounted() {
        this.fetchTimelinePosts();
    },
    methods: {
        fetchTimelinePosts: async function (){
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await postService.fetchTimelinePosts();
                this.timeLinePosts = response.data;
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style scoped>
    .username-text{
        font-weight: 600;
    }
</style>