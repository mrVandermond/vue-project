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
        msgButton: 'Регистрация',
        msgText: 'Вы уже зарегестрированы? Тогда ',
        msgLink: 'Войдите'
      },
      pathLink: '/login',
    }
  },
  components: {
    BaseAuth
  },
  methods: {
    auth (data) {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(
        () => {
          this.$router.replace('login');
          this.$store.commit("SET_ACTIVE_MSG");
        },
        (e) => {
          this.$store.commit("SET_ACTIVE_MSG");
          alert('Oops' + e.message);
        }
      )
    }
  }
}
</script>

<style>

</style>
