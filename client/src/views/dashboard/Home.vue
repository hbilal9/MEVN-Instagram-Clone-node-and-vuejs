<template>
    <div>
        <Header />
        <router-view></router-view>
        <BottomNavigation/>
    </div>
</template>

<script>
import * as auth from '../../services/auth_service';
import Header from '../../components/Header.vue';
import BottomNavigation from '../../components/BottomNavigation.vue';
export default {
    components:{
        Header,
        BottomNavigation,
    },
    beforeCreate: async function () {
		try {
			if (auth.isLoggedIn()) {
				const response = await auth.getProfile();
				this.$store.dispatch("authenticate", response.data);
			} else {
				this.$router.push("/login");
			}
		} catch (error) {
			console.log('here reached');
			auth.logout();
		}
	},
}
</script>