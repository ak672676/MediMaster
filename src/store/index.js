import { createStore } from 'vuex'
import * as auth from '../services/AuthService';

// apiUrl:'http://localhost:3000/api',
export default createStore({
  state: {
    isLoggedIn:false,
    // apiUrl:`${window.location.protocol}//${window.location.hostname}/api`,
    apiUrl:`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`,
    username:null,
    userId:null,
    isAdmin:false,
    discount:0
  },

  mutations: {
    authenticate(state){
      state.isLoggedIn=auth.isLoggedIn();
      if(state.isLoggedIn){
        state.username=auth.getUsername();
        state.userId=auth.getUserId();
        state.isAdmin=auth.checkUserIsAdmin();
        state.discount=auth.getUseDiscount();

      }else{
        state.userId=null;
        state.username=null;
        state.isAdmin=false;
        state.discount=0;
      }
    }
  },
  actions: {
    authenticate(context){
      context.commit('authenticate');
    }
  },
  modules: {
  }
})


// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     isLoggedIn:false,
//     apiUrl:'http://localhost:3000',
//     username:null,
//     userId:null
//   },
//   mutations: {
//     authenticate(state){
//       state.isLoggedIn=auth.isLoggedIn();
//       if(state.isLoggedIn){
//         state.username=auth.getUsername();
//         state.userId=auth.getUserId();
//       }else{
//         state.userId=null;
//         state.username=null;
//       }
//     }
//   },
//   actions: {
//     authenticate(context){
//       context.commit('authenticate');
//     }
//   },
//   modules: {
//   }
// });

// Vue.prototype.$store = store;
// export default store;