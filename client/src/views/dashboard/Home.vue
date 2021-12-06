<template>
    <div>
        <Header />
        <router-view></router-view>
        <BottomNavigation/>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import BottomNavigation from '../../components/BottomNavigation.vue';
export default {
    components:{
        Header,
        BottomNavigation,
    }
}
</script>