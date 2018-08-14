<template>
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
      this.textNewPost = '';
    }
  },
  beforeMount () {
    this.$store.dispatch('getPost');
  }
}
</script>

<style>

</style>
