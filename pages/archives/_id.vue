<template lang="pug">
#container
  main#main
    .archive
      .banner
        img.bg(v-if="archive && archive.cover", :src="archive.cover.src") 
        .post-header
          .post-title {{ archive.title || '' }}
          //- ul.post-tags
            li.post-tag(v-for="(tag, i) in tags", :key="i") 
              //- i.tag-icon.fa.fa-tags
              SvgIcon(type="mdi", :path="mdiTag")
              span.tag-text {{ tag }}
      .markdown
        client-only
          //- SMdPreview(:content="archive.body")
          SMarkdown(:value="archive.body")
      SComment(:title="this.$route.path")
</template>

<script>
import { mdiTag } from "@mdi/js";

export default {
  data: () => ({
    markdown: {
      toolbars: {
        fullscreen: false,
      },
    } /*
    archive: {
      title: "",
      body: "",
    },*/,
    comments: {},
  }),
  created() {
    /*
     */
  },
  computed: {
    archive() {
      console.log(this.$store.state.archive);
      return this.$store.state.archive || {};
    },
    tags() {
      if (this.archive.archiveTags) return this.archive.archiveTags.split(" ");
    },
  },
  methods: {},
  async fetch({ store, params }) {
    const id = Number(params.id || 0);
    // 先从缓存里面找
    if (store.state.archives) {
      store.commit(
        "archive",
        store.state.archives.find((item) => Number(item.number) === id)
      );
    }
    // 如果没有找到就请求
    if (!store.state.archive) {
      await store.dispatch("archive", { id });
    }
    store.commit("header", {
      title: this.archive ? this.archive.title : "无题",
      // isHideSubtitle: true,
      isHide: true,
    });
  },
};
</script>

<style lang="scss" scoped>
#main {
  margin-top: 0rem;
}

.archive {
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
    margin-top: -3rem;
  }
}
</style>
