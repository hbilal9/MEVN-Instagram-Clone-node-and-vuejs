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
            <div
                class="collapse navbar-collapse"
            >
                <form class="form-inline my-2 my-lg-0 ml-auto"
                    v-if="$store.state.isLoggedIn"
                >
                    <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </form>
                <ul class="navbar-nav ml-auto mr-5">
                    <li class="nav-item"
                        v-if="$store.state.isLoggedIn"
                    >
                        <router-link class="nav-link" :to="`/${$store.state.profile.role}`">
                            <icon class="header-icon" icon="home"/>
                        </router-link>
                    </li>
                    <li class="nav-item"
                        v-if="$store.state.isLoggedIn"
                    >
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="comment-dots"/>
                        </router-link>
                    </li>
                    <li class="nav-item"
                        v-if="$store.state.isLoggedIn"
                    >
                        <a class="nav-link" href="javascript: void(0)" @click="showCreatePostModal()">
                            <icon class="header-icon" icon="plus-square"/>
                        </a>
                    </li>
                    <li class="nav-item"
                        v-if="$store.state.isLoggedIn"
                    >
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="compass"/>
                        </router-link>
                    </li>
                    <li class="nav-item"
                        v-if="$store.state.isLoggedIn"
                    >
                        <router-link class="nav-link" to="/">
                            <icon class="header-icon" icon="heart"/>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item ml-1">
                        <router-link to="/user/profile">
                            <avatar :size="36" v-if="$store.state.isLoggedIn"
                                :src="$store.state.profile ? $store.state.profile.display_photo : ''"
                                :username="$store.state.profile ? $store.state.profile.display_photo : 'username'">
                            </avatar>
                        </router-link>
                    </li> -->
                    <li class="nav-item dropdown"
                        v-if="$store.state.isLoggedIn"
                    >
                        <a href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                            <avatar :size="36" v-if="$store.state.isLoggedIn"
                                :src="$store.state.profile ? $store.state.profile.display_photo : ''"
                                :username="$store.state.profile ? $store.state.profile.display_photo : 'username'">
                            </avatar>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/user/profile">Profile</router-link>
                            <a class="dropdown-item" href="javascript: void(0)" @click="logout">Logout</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login"
                            v-if="$store.state.isLoggedIn == null"
                        >
                            Login
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
import {logout, isLoggedIn} from '../services/auth_service';
export default {
    components: {
        CreatePost,
        Avatar,
    },
    data(){
        return{
            isLoggedIn: false,
        }
    },
    mounted() {
        this.isLoggedIn = isLoggedIn();
        console.log(this.$store.state.isLoggedIn)
    },
    methods: {
        showCreatePostModal(){
            this.$refs.createPost.showCreatePostModal();
        },
        logout(){
            logout();
            this.$router.push('/login');
        },
        // isLoggedIn(){
        //     // console.log(isLoggedIn())
        //     return isLoggedIn();
        // }
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
