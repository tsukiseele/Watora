<template lang="pug">
#container
  main#main
    .list 
      .card(
        v-for="(link, index) in links",
        :key="index",
        data-aos="flip-left",
        data-aos-once="true"
      )
        img.link-icon(:src="link.linkIcon")
        .link-wrap 
          .link-name.single-line {{ link.linkName }}
          .link-info.single-line {{ link.linkInfo }}
</template>

<script>
export default {
  data: {
    links: []
  },
  fetch() {
    this.$store.commit("header", { title: "『友链』" });
  },
  async asyncData({ app }) {
    let links = [];
    try {
      const res = await app.$api.getAllLink();
      if (res.ok) {
        links = res.data;
      }
    } catch (e) {
      console.log(e);
    }
    return {
      links
    };
  }
};
</script>

<style lang="scss" scoped>
#container {
}

#main {
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.card {
  display: flex;
  margin: 0.5rem;
  width: calc(100% / 3 - 1rem);
  background: var(--card);
  transition: all 0.3s;
  border-radius: 5px;
  box-shadow: 0 0 9px var(--shadow);
  max-height: 200px;
  overflow: hidden;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background: var(--card);
  }
  .link-icon {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    box-shadow: 0 0 9px var(--shadow);
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  &:hover .link-icon {
    transform: rotate(360deg);
  }
  .link-wrap {
    flex-grow: 1;
    overflow: hidden;
    text-align: center;
    padding-left: 0.2rem;
  }
  .link-name {
    font-size: 1.1rem;
    font-weight: normal;
    color: var(--text-primary);
  }
  .link-info {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
}
@media screen and (max-width: 1024px) {
  .card {
    // width: calc(100% / 2 - 1rem);
    width: 100%;
  }
}
</style>
