<template>
    <main class="main-bottom-navigation">
        <div class="bottom-navigation fixed-bottom d-flex justify-content-center mt-4">
            <router-link class="btn" :to="`/${$store.state.profile.role}`"
                v-if="$store.state.isLoggedIn"
            >
                <icon class="icon" icon="home"/>
            </router-link>
            <router-link class="btn" to="/user/find"
                v-if="$store.state.isLoggedIn"
            >
                <icon class="icon" icon="compass"/>
            </router-link>
            <button class="btn" @click="showCreatePostModal"
                v-if="$store.state.isLoggedIn"
            >
                <icon class="icon" icon="plus-square"/>
            </button>
            <router-link class="btn" to="#"
                v-if="$store.state.isLoggedIn"
            >
                <icon class="icon" icon="heart"/>
            </router-link>
            <button class="btn ml-4"
                v-if="$store.state.isLoggedIn"
            >
                <avatar :size="36" v-if="$store.state.isLoggedIn"
                    :src="$store.state.profile ? $store.state.profile.display_photo : ''"
                    :username="$store.state.profile ? $store.state.profile.display_photo : 'username'">
                </avatar>
            </button>
            <router-link class="btn btn-default" to="/login"
                v-if="$store.state.isLoggedIn == null"
            >
                Login
            </router-link>
        </div>
        <create-post ref="createPost"/>
    </main>
</template>

<script>
import Avatar from 'vue-avatar';
import CreatePost from '../views/dashboard/user/CreatePost.vue';
export default {
  components: { CreatePost, Avatar },
    methods: {
        showCreatePostModal(){
            this.$refs.createPost.showCreatePostModal();
        }
    },
}
</script>

<style>
    .icon{
        font-size: 2rem;
    }
    .bottom-navigation{
        box-shadow: 4px 0 0 0 rgba(0,0,0,0.16);
    }
</style>