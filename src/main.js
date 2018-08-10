import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import firebase from 'firebase'
import firebaseConfig from '@/firebase.config.js'

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)

let VueApp;

firebase.auth().onAuthStateChanged(() => {
  if (!VueApp) {
    VueApp = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
})
