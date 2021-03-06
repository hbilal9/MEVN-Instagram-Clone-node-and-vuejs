import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import BoostrapVue from 'bootstrap-vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);
library.add(far);

Vue.component('icon', FontAwesomeIcon);


Vue.config.productionTip = false
Vue.use(BoostrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
