<template>
  <li class="blog__item post">
    <p class="post__text">{{ post.text }}</p>
    <p class="post__author">{{ post.author }}</p>    
    <p class="post__pubdate">{{ getDate }}</p>
  </li>
</template>

<script>
export default {
  props: {
    post: Object
  },
  computed: {
    getDate() {
      let date = new Date(this.post.pubdate);
      let day = ("00" + date.getDate()).slice(-2);
      let month = ("00" + date.getMonth()).slice(-2);
      let year = date.getFullYear();
      return day + "." + month + "." + year;
    }
  }
};
</script>

<style>
.blog__item {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 5px 0;
  padding: 0 10px;
}
.post__pubdate,
.post__author {
  width: 50%;
  display: inline-block;
}
.post__pubdate {
  text-align: right;
}
</style>
