<template>
  <div class="edit edit_position">
    <input
      type="text"
      class="edit__input"
      placeholder="Имя польлзователя"
      v-model="newUserName">
    <input
      type="text"
      class="edit__input"
      placeholder="Email пользователя"
      v-model="newUserEmail">
    <p class="edit__wrap-button">
      <button
        class="edit__button"
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
.edit__input {
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  display: block;
  border: 1px solid #0c4f86;
  border-radius: 2px;
}
.edit__button {
  display: inline-block;
  margin-top: 20px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  background-color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
.edit__button:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
.edit__wrap-button {
  width: 300px;
  text-align: center;
}
</style>
