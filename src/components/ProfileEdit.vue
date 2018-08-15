<template>
  <div class="edit edit_position">
    <input
      type="text"
      class="base-input"
      placeholder="Имя польлзователя"
      v-model="newUserName">
    <input
      type="text"
      class="base-input"
      placeholder="Email пользователя"
      v-model="newUserEmail">
    <p class="edit__wrap-button">
      <button
        class="base-button"
        v-on:click="updateProfile">Сохранить</button>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      newUserName: firebase.auth().currentUser.displayName || '',
      newUserEmail: firebase.auth().currentUser.email || ''
    }
  },
  methods: {
    updateProfile () {
      this.$store.dispatch('updateProfile', {
        displayName: this.newUserName,
        email: this.newUserEmail
      }).then(
        () => {
          this.$store.commit('SET_ACTIVE_EDIT');
          this.$emit('updateProfile');
        },
        // eslint-disable-next-line
        (e) => console.log(e.message)
      )
    }
  }
}
</script>

<style>
.edit_position {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-top: 20px;
}
.edit__wrap-button {
  width: 300px;
  text-align: center;
}
</style>
