<template>
  <div class="home">
    <div class="home__header">
      <nav class="home__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <router-link class="menu__link" v-bind:to="{name: 'home'}">Главная</router-link>
          </li>
          <li class="menu__item">
            <router-link class="menu__link" v-bind:to="{name: 'profile'}">Профиль</router-link>
          </li>
          <li class="menu__item">
            <a class="home__logout menu__link" v-on:click="logout">Выйти</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="home__content">
      <router-view/>
    </div>
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
  },
  beforeMount () {
    this.$store.dispatch('getPosts');
  }
}
</script>

<style>
.home__menu {
  height: 60px;
  box-shadow: 0 1px 10px #0c4f86;
}
.home__logout {
  cursor: pointer;
}
.home__content {
  width: 1000px;
  margin: 0 auto;
  position: relative;
}
.menu__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: right;
}
.menu__item {
  display: inline-block;
  line-height: 60px;
}
.menu__link {
  display: inline-block;
  line-height: 30px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  padding: 3px 5px;
  margin: 0 10px;
  color: #000;
  text-decoration: none;
}
.menu__link:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
</style>
