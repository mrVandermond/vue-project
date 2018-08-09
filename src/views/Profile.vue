<template>
  <div class="profile profile_position">
    <div class="profile__left-column">
      <div class="profile__avatar">
        <img class="profile__img" v-bind:src="getUrlAvatar" v-if="getUrlAvatar" v-bind:key="'avatarURL'" alt="avatar">
        <img class="profile__img" src="@/assets/user.png" v-else v-bind:key="'defaultavatar'" alt="avatar">
        <button class="profile__button" v-on:click="activeEdit">Изменить данные</button>
      </div>
    </div><!--
    --><div class="profile__right-column">
      <p class="profile__name profile__text">
        <span class="profile__subtext">Ваше имя:</span>
        <input
          type="text"
          placeholder="Имя пользователя"
          class="profile__input"
          v-if="isActiveEdit"
          v-model="userName">
        <span class="profile__user-val" v-else>{{ getNameUser }}</span>
      </p>
      <p class="profile__email profile__text">
        <span class="profile__subtext">Ваш Email:</span>
        <input
          type="text"
          placeholder="Email"
          class="profile__input"
          v-if="isActiveEdit"
          v-model="userEmail">  
        <span class="profile__user-val" v-else>{{ getUser.email }}</span>
      </p>
      <p class="profile__phone profile__text">
        <span class="profile__subtext">Ваш номер телефона:</span>
        <input
          type="text"
          placeholder="Номер телефона"
          class="profile__input"
          v-if="isActiveEdit"
          v-model="userPhone">
        <span class="profile__user-val" v-else>{{ getPhoneUser }}</span>
      </p>
      <p class="profile__wrap-button" v-if="isActiveEdit">
        <button class="profile__button" v-on:click="saveDataUser">Сохранить</button>
      </p>
    </div>
    <div class="profile__clearfix"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isActiveEdit: false,
      userName: '',
      userEmail: '',
      userPhone: ''
    }
  },
  computed: {
    getUser () {
      return this.$store.getters.getUser;
    },
    getNameUser () {
      return this.getUser.displayName || 'Имя пользователя';
    },
    getPhoneUser () {
      return this.getUser.phoneNumber || 'Номер телефона пользователя';
    },
    getUrlAvatar () {
      return this.getUser.photoURL || false;
    }
  },
  methods: {
    activeEdit () {
      this.userName = this.getUser.displayName || '';
      this.userEmail = this.getUser.email || '';
      this.userPhone = this.getUser.phoneNumber || '';
      this.isActiveEdit = true;
    },
    saveDataUser () {
      if (this.userName.length > 0) {
        this.$store.dispatch('updateDisplayName', {
          displayName: this.userName
        });
      }
      if (this.userEmail.length > 0) {
        this.$store.dispatch('updateEmail', {
          email: this.userEmail
        });
      }
      if (this.userPhone.length > 0) {
        this.$store.dispatch('updatePhone', {
          phone: this.userPhone
        })
      }
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
.profile__wrap-button {
  text-align: center;
}
.profile__input {
  padding: 10px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
}
</style>
