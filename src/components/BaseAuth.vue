<template>
  <div class="auth auth_position">
    <h2 class="auth__title">{{ nameAuth }}</h2>
    <input class="auth__input" type="text" placeholder="Email" v-model="email">
    <input class="auth__input" type="password" placeholder="Password" v-model="password">
    <button 
      class="auth__button"
      v-on:click="auth">{{ msg.msgButton }}</button>
    <img v-if="isActiveMsg" src="@/assets/preloader.gif" class="auth__img" alt="preloader">
    <p class="auth__text">{{ msg.msgText }}<router-link class="auth__link" v-bind:to="pathLink">{{ msg.msgLink }}</router-link></p>
  </div>
</template>

<script>
export default {
  props: {
    nameAuth: String,
    msg: Object,
    pathLink: String
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    isActiveMsg() {
      return !this.$store.state.isActiveMsg;
    }
  },
  methods: {
    auth() {
      this.$store.commit("SET_ACTIVE_MSG");
      this.$emit("auth", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>


<style>
.auth_position {
  width: 300px;
  margin: 0 auto;
  margin-top: 100px;
}
.auth__title {
  text-align: center;
}
.auth__input {
  width: 100%;
  display: block;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #0c4f86;
  border-radius: 2px;
}
.auth__button {
  padding: 5px 10px;
  display: block;
  background-color: #fff;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  margin: 0 auto;
  margin-top: 20px;
  cursor: pointer;
}
.auth__text {
  font-size: 12px;
  text-align: center;
}
.auth__link {
  color: #0c4f86;
  font-weight: bold;
  text-decoration: none;
}
.auth__img {
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
</style>
