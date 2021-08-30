<template lang="pug">
#container
  main#main
    .archive
      .banner
        //- img.bg(:src="archive.archiveCover || $statics.images.backgrounds[0]") 
        .post-header
          .post-title {{ archive.title || '' }}
          //- ul.post-tags
            li.post-tag(v-for="(tag, i) in tags", :key="i") 
              //- i.tag-icon.fa.fa-tags
              SvgIcon(type="mdi", :path="mdiTag")
              span.tag-text {{ tag }}
      .markdown
        client-only
          SMdPreview(:content="archive.body")
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
    },
    archive: {
      title: "",
      body: "",
    },
    comments: {},
  }),
  created() {
    this.$store.commit("header", {
      title: this.archive.title || "无题",
      isHideSubtitle: true,
      isHide: true,
    });
  },
  methods: {},
  async asyncData({ app, params, store }) {
    const id = parseInt(params.id || 0);
    if (store.state.archives) {
      return {
        archive:
          store.state.archives.find((item) => Number(item.number) === id) || {},
      };
    }
    return {
      archive: (await app.$service.getArchiveById(id)) || {},
    };
  },
  computed: {
    tags() {
      if (this.archive.archiveTags) return this.archive.archiveTags.split(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
#main {
  margin-top: 0rem;
}

.archive {
}

.markdown {
  overflow: hidden;
}

.comments {
  overflow: hidden;
  padding: 1rem;
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
  width: 100%;
  height: 50vh;
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
  .markdown,
  .comments {
    border-radius: 0;
    margin: 0 !important;
  }
  #main {
    margin-top: -3rem;
  }
}
</style>
