import Vue from 'vue'
import Vuex from 'vuex'
import {isLoggedIn} from './services/auth_service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiURL: 'http://127.0.0.1:8000/api',
    serverPath: '',
    isLoggedIn: null,
    profile: {}
  },
  mutations: {
    authenticate(state, payload){
      state.isLoggedIn = isLoggedIn();
      if (state.isLoggedIn) {
        state.profile = payload;
      }else{
        state.profile = {};
      }
    }
  },
  actions: {
    authenticate(context, payload){
      context.commit('authenticate', payload);
    }
  },
  modules: {
  }
})
