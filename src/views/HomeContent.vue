<template>
  <p></p>
</template>

<script>
import BlogItem from "@/components/BlogItem";

export default {
  data() {
    return {
      textNewPost: ""
    };
  },
  components: {
    BlogItem
  },
  beforeRouteUpdate(to, from, next) {
    var typeClick = "left";
    if (Number(to.params.page) > this.$store.state.currentPage)
      typeClick = "right";
    this.$store.dispatch("getPost", {
      typeClick: typeClick
    });
    next();
  }
};
</script>

<style>
</style>
