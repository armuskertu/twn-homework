<template>
  <Loader class="contentLoader" v-if="loading"
    >Laen artiklit<font-awesome-icon icon="spinner" size="2x" spin
  /></Loader>
  <article class="article">
    <h1 class="articleTitle">{{ post.title }}</h1>
    <div class="introText" v-html="post.intro"></div>

    <div class="image">
      <div class="img">
        <img :src="post.image.large" />
        <div class="backdrop" :style="backdropStyles">
          <img :src="post.image.large" />
          <div class="caption">Feugiat pharetra facilisis.</div>
        </div>
      </div>
    </div>

    <div class="textBody" v-html="post.body"></div>
    <div class="tags"><span class="tag">sagittis</span></div>
    <div class="tags"><span class="tag">nam</span></div>
  </article>
</template>


<script>
export default {
  data() {
    return {
      post: {},
      loading: {},
    };
  },
  computed: {
    backdropStyles() {
      return this.image;
    },
  },

  created() {
    fetch("https://midaiganes.irw.ee/api/list/4e34a5c4")
      .then((response) => response.json())
      .then((data) => (this.post = data));
    this.loading = false;
  },
};
</script>
