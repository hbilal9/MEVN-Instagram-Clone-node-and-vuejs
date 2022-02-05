<template>
    <div class="container" style="margin-top:6rem;">
        <div class="row">
            <div v-if="loading" class="col-12 col-sm-12 col-lg-8 d-flex justify-content-center mb-4 mt-1">
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-lg-8 d-flex justify-content-center main-contents mb-2"
                v-for="(user, index) in users" :key="index"
            >
                <div class="card" style="width: 25rem;"
                    :style="index+1 == users.length ? 'margin-bottom: 5rem' : ''"
                >
                    <router-link 
                        :to="`/${user.username}`"
                        class="d-flex justify-content-between"
                        style="color: black"
                    >
                        <span class="card-title mt-2 ml-2 d-flex justify-content-left">
                            <avatar :size="36" :src="user.display_photo" :username="user.username"></avatar>
                            <span class="username-text mt-1 ml-2">{{ user.username}}</span>
                        </span>
                    </router-link>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import Avatar from 'vue-avatar';
import {getAllUsers} from '../../../services/user_service';
export default {
    components: {
        Avatar,
    },
    data() {
        return {
            users: [],
            loading: false,
        }
    },
    mounted() {
        this.loading = true;
        this.fetchUsers();
    },
    methods: {
        fetchUsers: async function (){
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await getAllUsers();
                this.users = response.data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        },
    },
}
</script>

<style scoped>
    .username-text{
        font-weight: 600;
    }
</style>