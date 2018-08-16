<template>
  <div class="home">
    <div class="home__header">
      <nav class="home__menu menu">
        <ul class="menu__list">
          <li class="menu__item">
            <router-link class="menu__link" v-bind:to="{name: 'home'}">Главная</router-link>
          </li>
          <li class="menu__item">
            <router-link class="menu__link" to="/home/profile">Профиль</router-link>
          </li>
          <li class="menu__item">
            <router-link class="menu__link" to="/home/blog">Блог</router-link>
          </li>
          <li class="menu__item">
            <a class="home__logout menu__link" v-on:click="logout">Выйти</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="home__content">
      <transition name="tooltip">
        <Tooltip
          v-if="$store.state.isActiveTooltip"/>
      </transition>
      <transition name="item-menu">
        <router-view/>
      </transition>
    </div>
    <transition name="popup">
      <PopUp
        v-if="$store.state.isActivePopUp"/>
    </transition>
    <transition name="popup-overlay">
      <div 
        class="popup__overlay"
        v-if="$store.state.isActivePopUp"></div>
    </transition>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip";
import PopUp from "@/components/PopUp";

export default {
  components: {
    Tooltip,
    PopUp
  },
  methods: {
    logout() {
      this.$store.commit("SET_ACTIVE_POPUP", {
        msgPopUp: "Подтвердите выход"
      });
    }
  }
};
</script>

<style>
.home__menu {
  height: 60px;
  margin-bottom: 10px;
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
.tooltip-enter-active,
.tooltip-leave-active {
  transition: 0.3s;
}
.tooltip-enter,
.tooltip-leave-to {
  opacity: 0;
  height: 0;
}
.tooltip-enter-to,
.tooltip-leave {
  opacity: 1;
  height: 50px;
}
.popup-enter-active,
.popup-leave-active {
  transition: 0.3s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
  top: 40%;
}
.popup-enter-to,
.popup-leave {
  opacity: 1;
  top: 45%;
}
.popup-overlay-leave-active,
.popup-overlay-enter-active {
  transition: 0.3s;
}
.popup-overlay-enter,
.popup-overlay-leave-to {
  opacity: 0;
}
.popup-overlay-enter-to,
.popup-overlay-leave {
  opacity: 1;
}
.item-menu-enter-active,
.item-menu-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  padding: 10px;
  transition: 0.3s;
}
.item-menu-enter,
.item-menu-leave-to {
  opacity: 0;
}
.item-menu-enter-to,
.item-menu-leave {
  opacity: 1;
}
</style>
