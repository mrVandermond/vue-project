<template>
  <div class="profile profile_position">
    <div class="profile__left-column">
      <div class="profile__avatar">
        <img class="profile__img" v-if="userPhotoURL" v-bind:src="userPhotoURL" v-bind:key="'avatarURL'" alt="avatar">
        <img class="profile__img" src="@/assets/user.png" v-else v-bind:key="'defaultavatar'" alt="avatar">
        <button class="base-button" v-on:click="activeEdit">Изменить данные</button>
        <button class="base-button" v-on:click="activeChangePassword">Изменить пароль</button>
        <label class="base-button profile__label">Изменить фотографию<input type="file" class="profile__input" v-on:change="changePhoto"></label>
      </div>
    </div><!--
    --><div class="profile__right-column">
      <div class="profile__wrap-info">
        <p class="profile__name profile__text">
          <span class="profile__subtext">Ваше имя:</span>
          <span class="profile__user-val">{{ userName }}</span>
        </p>
        <p class="profile__email profile__text">
          <span class="profile__subtext">Ваш Email:</span>
          <span class="profile__user-val">{{ userEmail }}</span>
        </p>
      </div>
      <ProfileEdit
        v-if="$store.state.isActiveEdit"
        v-on:updateProfile="updateProfile"/>
      <ProfileChangePassword
        v-if="$store.state.isActiveChangePassword"
        />
    </div>
    <div class="profile__clearfix"></div>
  </div>
</template>

<script>
import ProfileEdit from '@/components/ProfileEdit'
import ProfileChangePassword from '@/components/ProfileChangePassword'
import firebase from 'firebase'

export default {
  data () {
    return {
      userName: firebase.auth().currentUser.displayName || 'Имя пользователя',
      userEmail: firebase.auth().currentUser.email || 'Email пользователя'
    }
  },
  components: {
    ProfileEdit,
    ProfileChangePassword
  },
  computed: {
    userPhotoURL () {
      return this.$store.state.userPhotoURL == '' ? false : this.$store.state.userPhotoURL;
    }
  },
  methods: {
    activeEdit () {
      this.$store.commit('SET_ACTIVE_EDIT');
    },
    activeChangePassword () {
      this.$store.commit('SET_ACTIVE_CHANGE_PASSWORD');
    },
    updateProfile () {
      this.userName = firebase.auth().currentUser.displayName || 'Имя пользователя';
      this.userEmail = firebase.auth().currentUser.email || 'Email пользователя';
    },
    changePhoto () {
      let file = document.querySelector('.profile__input').files[0];
      this.$store.dispatch('uploadPhoto', {
        file: file
      }).then(
        () => {
          this.$store.commit('SET_ACTIVE_TOOLTIP', {
            msgTooltip: 'Фотография успешно изменена',
            typeTooltip: 'success'
          });
        },
        (e) => {
          this.$store.commit('SET_ACTIVE_TOOLTIP', {
            msgTooltip: e.message,
            typeTooltip: 'error'
          });
        }
      )
    }
  },
  beforeMount () {
    this.$store.commit('SET_USER_PHOTO_URL', {
      photoURL: firebase.auth().currentUser.photoURL
    });
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
.profile__wrap-info {
  padding: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
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
.profile__label {
  color: #000;
  font-size: 14px;
}
.profile__input {
  display: none;
}
</style>
