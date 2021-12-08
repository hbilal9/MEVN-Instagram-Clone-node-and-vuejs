<template>
    <div class="container" style="margin-top:6rem;">
        <div class="row">
            <div v-if="loading" class="col-12 col-sm-12 col-lg-8 d-flex justify-content-center mb-4 mt-1">
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
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
                        v-if="post.img"
                    >
                    <div class="card"
                        v-else
                        :style="{'background-color': post.captionBgColor}"
                    >
                        <p class="card-text ml-2"
                            :style="{'color': post.captionFontColor,
                                'font-weight': 600,
                                'min-height': '4rem'
                            }"
                        >
                            <span :style="post.fontFamily ? {'font-family': post.fontFamily} : {'font-family': 'sans-serif'}">
                                {{post.caption}} </span>
                        </p>
                    </div>
                    <div class="card-body">
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
        <create-post @addNewPost="onNewPost"></create-post>
    </div>
</template>

<script>
import Avatar from 'vue-avatar';
import CreatePost from './CreatePost.vue'
import * as postService from '../../../services/post_service';
export default {
    components: {
        Avatar,
        CreatePost,
    },
    data() {
        return {
            timeLinePosts: [],
            loading: false,
        }
    },
    mounted() {
        this.loading = true;
        this.fetchTimelinePosts();
    },
    methods: {
        fetchTimelinePosts: async function (){
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await postService.fetchTimelinePosts();
                this.timeLinePosts = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },
        onNewPost(post){
            this.timeLinePosts.unshift(post);
        }
    },
}
</script>

<style scoped>
    .username-text{
        font-weight: 600;
    }
</style>