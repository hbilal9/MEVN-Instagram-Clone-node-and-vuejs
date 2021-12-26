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
                    <router-link 
                        :to="`/${post.postedBy.username}`"
                        class="d-flex justify-content-between"
                        style="color: black"
                    >
                        <span class="card-title mt-2 ml-2 d-flex justify-content-left" v-if="post.postedBy">
                            <avatar :size="36" :src="post.postedBy.display_photo" :username="post.postedBy.username"></avatar>
                            <span class="username-text mt-1 ml-2">{{ post.postedBy.username}}</span>
                        </span>
                        <button class="btn">
                            <icon class="header-icon mt-2 mr-2" icon="ellipsis-v"/>
                        </button>
                    </router-link>
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
                                'min-height': '4rem',
                                'white-space': 'pre-line'
                            }"
                        >
                            <span :style="post.fontFamily ? {'font-family': post.fontFamily} : {'font-family': 'sans-serif'}">
                                {{post.caption}} </span>
                        </p>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="buttons-group">
                                <button class="btn"
                                    @click="unlikePost(post)"
                                    v-if="post.likes.includes($store.state.profile._id)"
                                >
                                    <icon color="#D4390F" :icon="['fas','heart']"></icon>
                                </button>
                                <button class="btn"
                                    @click="likePost(post)"
                                    v-else
                                >
                                    <icon :icon="['far','heart']"></icon>
                                </button>
                                <button class="btn"><icon icon="comment"></icon></button>
                                <button class="btn"><icon icon="paper-plane"></icon></button>
                            </div>
                            <div class="save-button">
                                <icon icon="bookmark"/>
                            </div>
                        </div>
                        <div class="d-flex">
                            <h6>{{post.likes.length}} Likes</h6>
                            <h6 class="ml-2">{{post.comments.length}} Comments</h6>
                        </div>
                        <div class="d-flex">
                            <div class="input-group mt-2">
                            <input type="text"
                                class="form-control"
                                placeholder="Add comments"
                                v-model="commentData.comment"
                            >
                                <div class="input-group-append">
                                    <button class="btn btn-primary"
                                        type="button"
                                        @click="addComment(post)"
                                    >
                                        <icon icon="paper-plane"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div class="" v-for="comment in getFirstTwoComments(post)" :key="comment._id">
                                <strong v-if="comment.commentBy">
                                    {{comment.commentBy.username}}:
                                </strong> {{comment.comment}}
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
            timeLinePosts: [],
            commentData: {},
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
        likePost: async function (post){
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await postService.likePost({post_id: post._id});
                this.timeLinePosts.forEach(post => {
                    if (post._id == response.data._id) {
                        return post.likes.push(this.$store.state.profile._id)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        unlikePost: async function (post){
            try {
                // eslint-disable-next-line no-unused-vars
                await postService.unlikePost({post_id: post._id});
                this.timeLinePosts.find(obj => {
                    if (obj._id == post._id) {
                        obj.likes.splice(this.$store.state.profile._id, 1)
                        return this.timeLinePosts;
                    }
                })
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },
        addComment: async function (post){
            try {
                // eslint-disable-next-line no-unused-vars
                this.commentData.post_id = post._id;
                const response = await postService.addComment(this.commentData);
                this.commentData = {};
                this.timeLinePosts.forEach(post => {
                    if (post._id == response.data._id) {
                        return post.comments = response.data.comments;
                    }
                })
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },
        getFirstTwoComments(post){
            const comments = post.comments
            return post.comments.slice((comments.length -2), comments.length);
        },
        onNewPost(post){
            console.log('new post', post)
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