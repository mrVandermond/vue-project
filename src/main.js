import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import firebase from 'firebase'
import firebaseConfig from '@/firebase.config'

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');

    app.$store.commit('SET_USER');
  }
})
