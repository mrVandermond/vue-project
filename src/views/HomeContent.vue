<template>
  <div class="blog blog_position" v-if="$store.state.countPost">
    <div class="blog__pagination">
      <router-link
        class="blog__left-pagination"
        v-if="isActiveLeftPage"
        v-bind:to="'/home/' + leftPage"
        >&lt; prev</router-link>
      <a class="blog__left-pagination_disabled" disabled v-else>&lt; prev</a>
      <span class="blog__count-page">{{ currentPage }} / {{ countPage }}</span>
      <router-link
        class="blog__right-pagination"
        v-if="isActiveRightPage"
        v-bind:to="'/home/' + rightPage"
        >next &gt;</router-link>
      <a class="blog__right-pagination_disabled" disabled v-else>next &gt;</a>
    </div>
  </div>
  <img src="@/assets/preloader.gif" alt="preloader" class="blog__preloader" v-else>
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
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    countPage() {
      return this.$store.state.countPage;
    },
    leftPage() {
      return String(
        this.currentPage == 1 ? this.currentPage : this.currentPage - 1
      );
    },
    rightPage() {
      return String(
        this.currentPage == this.countPage
          ? this.countPage
          : this.currentPage + 1
      );
    },
    isActiveLeftPage() {
      return this.currentPage == 1 ? false : true;
    },
    isActiveRightPage() {
      return this.currentPage == this.countPage ? false : true;
    }
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
.blog__pagination {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.blog__left-pagination,
.blog__right-pagination,
.blog__left-pagination_disabled,
.blog__right-pagination_disabled {
  margin: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  color: #0c4f86;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  padding: 5px;
}
.blog__left-pagination:hover,
.blog__right-pagination:hover {
  background-color: rgba(12, 79, 134, 0.473);
}
.blog__left-pagination_disabled,
.blog__right-pagination_disabled {
  color: #797979;
  border: 1px solid #797979;
  cursor: pointer;
}
.blog__left-pagination_disabled:hover,
.blog__right-pagination_disabled:hover {
  background-color: rgba(119, 119, 119, 0.473);
}
</style>
