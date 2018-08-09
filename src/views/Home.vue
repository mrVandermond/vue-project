<template>
  <div class="home">
    <button class="home__logout" v-on:click="logout">Выйти</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
    }
  }
}
</script>

<style>

</style>
