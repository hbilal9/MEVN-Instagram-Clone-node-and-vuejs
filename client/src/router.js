import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from './views/Home';
import {isLoggedIn, getUserRole} from './services/auth_service';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    redirect: 'login'
  },
  //admin
  {
    path: '/admin',
    component: () => import('./views/dashboard/Home.vue'),
    children:[
      {
        path: '',
        component: () => import('./views/dashboard/admin/Dashboard.vue')
      }
    ],
    beforeEnter(to, from, next){
      if(isLoggedIn() && getUserRole() === 'admin'){
        next();
      }else{
        next('/404');
      }
    }
  },
  //user
  {
    path: '/user',
    component: () => import('./views/dashboard/Home.vue'),
    children:[
      {
        path: '',
        component: () => import('./views/dashboard/user/Dashboard.vue')
      }
    ],
    beforeEnter(to, from, next){
      if(isLoggedIn() && getUserRole() === 'user'){
        next();
      }else{
        next('/404');
      }
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/authentication/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/authentication/Register.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('./views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
