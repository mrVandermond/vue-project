<template>
  <div class="profile profile_position">
    <div class="profile__left-column">
      <div class="profile__avatar">
        <img class="profile__img" v-bind:src="userURL" v-if="userURL" v-bind:key="'avatarURL'" alt="avatar">
        <img class="profile__img" src="@/assets/user.png" v-else v-bind:key="'defaultavatar'" alt="avatar">
        <button class="profile__button" v-on:click="activeEdit">Изменить данные</button>
        <button class="profile__button" v-on:click="updateUserPhoto">Изменить фото</button>
      </div>
    </div><!--
    --><div class="profile__right-column">
      <p class="profile__name profile__text">
        <span class="profile__subtext">Ваше имя:</span>
        <span class="profile__user-val">{{ userName }}</span>
      </p>
      <p class="profile__email profile__text">
        <span class="profile__subtext">Ваш Email:</span>
        <span class="profile__user-val">{{ userEmail }}</span>
      </p>
      <p class="profile__phone profile__text">
        <span class="profile__subtext">Ваш номер телефона:</span>
        <span class="profile__user-val">{{ userPhone }}</span>
      </p>
      <ProfileEdit
        v-if="$store.state.isActiveEdit"
        v-on:updateProfile="updateProfile"/>
    </div>
    <div class="profile__clearfix"></div>
  </div>
</template>

<script>
import ProfileEdit from '@/components/ProfileEdit'
import firebase from 'firebase'

export default {
  data () {
    return {
      userName: firebase.auth().currentUser.displayName || 'Имя пользователя',
      userEmail: firebase.auth().currentUser.email || 'Email пользователя',
      userPhone: firebase.auth().currentUser.phoneNumber || 'Телефон пользователя',
      userURL: firebase.auth().currentUser.photoURL,
    }
  },
  components: {
    ProfileEdit
  },
  methods: {
    activeEdit () {
      this.$store.commit('SET_ACTIVE_EDIT');
    },
    updateProfile () {
      this.userName = firebase.auth().currentUser.displayName || 'Имя пользователя';
      this.userEmail = firebase.auth().currentUser.email || 'Email пользователя';
      this.userPhone = firebase.auth().currentUser.phoneNumber || 'Телефон пользователя';
    },
    updateUserPhoto () {

    }
  }
}
</script>

<style>
.profile_position {
  padding: 10px;
}
.profile__left-column {
  width: 30%;
  float: left;
  text-align: center;
}
.profile__right-column {
  width: 70%;
  float: right;
}
.profile__clearfix {
  clear: both;
}
.profile__avatar {
  width: 150px;
  height: 150px;
  display: inline-block;
}
.profile__img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: inline-block;
}
.profile__text {
  padding: 15px 0 15px 10px;
}
.profile__subtext {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}
.profile__button {
  display: inline-block;
  margin-top: 20px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  background-color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
.profile__button:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
</style>
