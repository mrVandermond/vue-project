<template>
  <base-auth
    v-bind:msg="msg"
    v-bind:pathLink="pathLink"
    v-on:auth="auth"
    />
</template>

<script>
import BaseAuth from '@/components/BaseAuth'
import firebase from 'firebase'

export default {
  data () {
    return {
      msg: {
        msgButton: 'Войти',
        msgText: 'Вы еще не зарегестрированы? Тогда перейдите к ',
        msgLink: 'Регистрации'
      },
      pathLink: '/sign-up',
    }
  },
  components: {
    BaseAuth
  },
  methods: {
    auth (data) {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(
        () => {
          this.$router.replace('home');
          this.$store.commit('SET_ACTIVE_MSG');
        },
        (e) => {
          this.$store.commit('SET_ACTIVE_MSG');
          alert('Oops' + e.message);
        }
      )
    }
  }
}
</script>

<style>

</style>
