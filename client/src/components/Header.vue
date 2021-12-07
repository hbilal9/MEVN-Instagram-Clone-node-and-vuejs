<template>
    <div class="">
        <nav class="navbar navbar-expand-lg navbar-white bg-white fixed-top">
            <router-link
                class="navbar-brand ml-5"
                to="/"
                style="font-family: 'Grand Hotel', cursive"
            >
                <h1 class="brand-name" style="font-size: 25px; font-weight: 550; color: black"> Instagram </h1>
            </router-link>

            <div class="collapse navbar-collapse">
                <form class="form-inline my-2 my-lg-0 ml-auto">
                    <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </form>
                <ul class="navbar-nav ml-auto mr-5">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="home"/>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="comment-dots"/>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript: void(0)" @click="showCreatePostModal()">
                            <icon class="header-icon" icon="plus-square"/>
                        </a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="compass"/>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="heart"/>
                        </router-link>
                    </li>
                    <li class="nav-item ml-1">
                        <router-link to="/user/profile">
                            <avatar :size="36" :src="$store.state.profile.display_photo" :username="$store.state.profile.username"></avatar>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <create-post ref="createPost"/>
    </div>  
</template>

<script>
import Avatar from 'vue-avatar';
import CreatePost from '../views/dashboard/user/CreatePost.vue';
export default {
    components: {
        CreatePost,
        Avatar,
    },
    methods: {
        showCreatePostModal(){
            this.$refs.createPost.showCreatePostModal();
        }
    },
}
</script>

<style scoped>
    .header-icon{
        font-size: 25px;
        color: black;
    }
    .navbar{
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.16);
    }
</style>
