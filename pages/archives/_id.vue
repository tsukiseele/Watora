<template lang="pug">
#container
  TheBanner(
    v-if="archive",
    :title="archive.title",
    :cover="archive.cover.src",
    :subtitle="header.subtitle",
    :disableTyping="false"
  )
  main#main
    .archive
      .markdown
        client-only
          SMarkdown(:content="archive.content")
      SComment(:title="this.$route.path")
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    markdown: {
      toolbars: {
        fullscreen: false,
      },
    },
    comments: {},
  }),
  computed: {
    ...mapState(["archive"]),
    header() {
      return {
        title: this.archive ? this.archive.title : "无题",

        subtitle: this.archive ? this.archive.description : "无题",
        isHideSubtitle: true,
        isHide: true,
      };
    },

    /*
    archive() {
      return this.$store.state.archive || {};
    }*/
  },
  methods: {},
  async fetch({ store, params }) {
    const id = parseInt(params.id);
    await store.dispatch("archive", { id });
  },
};
</script>

<style lang="scss" scoped>
#main {
  margin-top: 0rem;
}

.archive {
  // padding: .5rem;
  // box-shadow: var(--shadow);
}

.markdown,
.comments,
.banner {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.comments {
  overflow: hidden;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--card);
  .comment-header {
    color: var(--text);
    font-size: 1.2rem;
  }
}

.banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  padding: 0;
  text-shadow: var(--shadow);
  @media screen and (max-width: $mobile) {
    height: 33vh;
  }
  /* 遮罩层*/
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--header);
  }
  /* 图片实体 */
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }
  .header {
    z-index: 1;
    .title {
      color: var(--text);
      font-size: 2.4rem;
      font-family: InfoDisplay;
      line-height: 2.5rem;
    }
    .tags {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      .tag {
        display: inline-block;
        text-align: center;
        color: var(--text);
        padding: 0.1rem 0.3rem;
        transition: color 0.3s ease;
        cursor: pointer;
        font-size: 0.9rem;
        &:hover {
          color: var(--text-primary);
        }
        .tag-icon {
        }
        .tag-text {
          font-family: InfoDisplay;
          padding-left: 0.2rem;
        }
      }
    }
  }
}
@media screen and(max-width: $mobile) {
  .banner,
  .markdown,
  .comments {
    border-radius: 0;
    margin: 0 !important;
    padding: 0 !important;
  }
  #main {
    // margin-top: -3rem;
  }
}
</style>
