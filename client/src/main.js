import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import BoostrapVue from 'bootstrap-vue';

Vue.config.productionTip = false
Vue.use(BoostrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
