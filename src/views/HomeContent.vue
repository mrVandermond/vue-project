<template>
  <div class="home-content">
    <h1 class="home-content__title">Последние посты</h1>
    <ul class="home-content__list" v-if="$store.state.lastPostList">
      <BlogItem
        v-for="post in posts"
        v-bind:key="post.pubdate"
        v-bind:post="post"
      />
    </ul>
    <img src="@/assets/preloader.gif" alt="preloader" class="home-content__preloader" v-else>
  </div>
</template>

<script>
import BlogItem from "@/components/BlogItem";
import firebase from "firebase/app";

export default {
  data() {
    return {};
  },
  components: {
    BlogItem
  },
  computed: {
    posts() {
      return this.$store.state.lastPostList;
    }
  },
  beforeMount() {
    this.$store.dispatch("getLastPost");

    firebase
      .database()
      .ref("posts")
      .on("child_added", () => {
        this.$store.dispatch("getLastPost");
      });
  }
};
</script>

<style>
.home-content__title {
  text-align: center;
  font-weight: normal;
}
.home-content__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.home-content__preloader {
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50% + 100px);
  left: 50%;
  margin-top: -75px;
  margin-left: -75px;
}
</style>
