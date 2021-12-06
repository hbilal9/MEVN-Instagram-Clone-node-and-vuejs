<template>
    <div class="container">
        <div class="">
            <div class="card border border-info" style="width: 22rem">
                <h1 class="text-center mt-3" style="font-family: 'Grand Hotel', cursive;">Instagram</h1>
                <div class="card-body">
                    <form @submit.prevent="register">
                        <div class="form-group">
                            <label for="first_name">First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="first_name"
                                v-model="userData.first_name"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="last_name"
                                v-model="userData.last_name"
                                placeholder="Enter Last Name"
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                v-model="userData.email"
                                placeholder="Enter email"
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="password"
                                v-model="userData.password"
                                autocomplete="false"
                                placeholder="Password"
                            />
                        </div>
                        <div class="text-center mt-4">
                            <button
                                type="submit"
                                class="btn btn-block btn-info"
                                :disabled="loading"
                            >
                                <span v-if="!loading"> Register </span>
                                <b-spinner variant="warning" label="Spinning" v-else></b-spinner>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as authService from '../../services/auth_service';
export default {
    name: 'Login',
    data(){
        return {
            userData: {},
            loading: false,
            errors: {}
        }
    },
    methods: {
        register: async function () {
            try{
                this.loading = true;
                const res = await authService.register(this.userData);
                console.log(res)
                this.$bvToast.toast(`Successfully registered.`, {
                    autoHideDelay: 3000,
                    variant: 'info'
                })
                this.loading = false;
                this.$router.push(`/login`);
            }
            catch(error){
                this.loading = false;
                console.log(error.status)
            }
        }
    },
}
</script>

<style scoped>
.container {
   display: flex !important;
   justify-content: center !important;
   align-items: center !important;
   height: 100vh !important;
}
</style>
