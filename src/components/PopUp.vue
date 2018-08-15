<template>
  <div class="popup popup_position">
      <p class="popup__text">{{ $store.state.msgPopUp }}</p>
      <button class="base-button popup__button" v-on:click="confirm">Да</button>
      <button class="base-button popup__button" v-on:click="cancel">Нет</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  methods: {
    confirm () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('SET_ACTIVE_POPUP', {
          msgPopUp: ''
        });
        this.$router.replace('/login');
      })
    },
    cancel () {
      this.$store.commit('SET_ACTIVE_POPUP', {
        msgPopUp: ''
      });
    }
  }
}
</script>

<style>
.popup {
  position: relative;
}
.popup_position {
  position: absolute;
  width: 300px;
  height: 250px;
  top: 45%;
  left: 50%;
  margin-top: -150px;
  margin-left: -125px;
  z-index: 100;  
  background-color: #fff;
  border: 1px solid #0c4f86;
  border-radius: 5px;
  text-align: center;
}
.popup__text {
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.popup__overlay {
  z-index: 99;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.377);
}
.popup__button {
  margin: 10px;
  font-size: 18px;
}
</style>
