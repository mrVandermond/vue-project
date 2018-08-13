<template>
  <div class="blog blog_position" v-if="$store.state.postList.length">
    <ul class="blog__list">
      <BlogItem
      v-for="post in posts"
      v-bind:key="post.pubdate"
      v-bind:post="post"/>
      <div class="blog__new-post">
        <textarea class="blog__text-post" placeholder="Текст поста" v-model="textNewPost"></textarea>
        <button class="blog__button" v-on:click="addNewPost">Опубликовать</button>
      </div>
    </ul>
  </div>
  <img src="@/assets/preloader.gif" alt="preloader" class="blog__preloader" v-else>
</template>

<script>
import firebase from 'firebase/app'
import BlogItem from '@/components/BlogItem'

export default {
  data () {
    return {
      textNewPost: ''
    }
  },
  components: {
    BlogItem
  },
  computed: {
    posts () {
      return this.$store.state.postList;
    }
  },
  methods: {
    addNewPost () {
      this.$store.dispatch('addNewPost', {
        text: this.textNewPost,
        pubdate: Date.now(),
        author: firebase.auth().currentUser.displayName
      });
    }
  }
}
</script>

<style>
.blog {
  position: relative;
}
.blog_position {
  padding: 10px;
}
.blog__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.blog__preloader {
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50% + 100px);
  left: 50%;
  margin-top: -75px;
  margin-left: -75px;
}
.blog__new-post {
  margin-top: 30px;
}
.blog__text-post {
  width: 80%;
  min-width: 80%;
  max-width: 80%;
  min-height: 40px;
  border: 1px solid #0c4f86;
  border-radius: 2px;
}
.blog__button {
  display: inline-block;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  background-color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 20px;
  vertical-align: top;
}
.blog__button:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
</style>
