<template lang="pug">
.comment-wrap
  .comment(v-for="(item, index) in comments", :key="index")
    .comment-body
      img.comment-avater(:src="item.visitor.visitorIcon || res.akarin")
      .comment-info
        .comment-username {{ item.visitor.visitorName }}
          span.comment-date {{ item.comment.commentDatetime | formatDate('yyyy-MM-dd hh:mm') }}
          input.comment-btn-reply(type="button", value="回复")
        .comment-content 
          span.comment-at(v-if="at && at !== item.visitor.visitorName") @{{ at }}
          span {{ item.comment.commentContent }}
    .comment-reply(v-if="item.childs", :class="{ child: isIndent(99) }")
      Comment(
        :deep="deep + 1",
        :comments="item.childs",
        :reply="reply",
        :at="item.visitor.visitorName"
      )
</template>

<script>
export default {
  name: "Comment",
  props: {
    comments: Array,
    at: String,
    reply: Function,
    deep: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    hover: false,
    defaultIcon:
      "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/akarin.png",
  }),
  computed: {
    res() {
      return {
        akarin: `${this.$static}/icon/akarin.png`,
      };
    },
  },
  methods: {
    isIndent(deep) {
      /*
      if (this.$vuetify.breakpoint.xsOnly) return this.deep < deep - 4;
      else if (this.$vuetify.breakpoint.smOnly) return this.deep < deep - 3;
      else if (this.$vuetify.breakpoint.mdOnly) return this.deep < deep - 2;
      else return this.deep < deep;*/
      return true;
    },
    handleReply(item) {
      this.reply(
        Object.assign({}, { comment: item.comment, visitor: item.visitor })
      );
    },
  },
  mounted() {
    console.log(this.comments);
  },
};
</script>

<style lang="scss" scoped>
.comment-reply {
  padding-left: 3rem;
  @media screen and(max-width: $mobile) {
    padding-left: 0;
    .comment-body {
      padding-left: 2rem;
    }
  }
  /*
  .comment-body {
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      // border-left: 0.33rem ridge var(--theme-primary);
    }
  }*/
}
.comment {
  padding-top: 1rem;
  font-family: InfoDisplay;

  .comment-body {
    position: relative;
    display: flex;
    // border-bottom: 0.1rem dotted var(--theme-primary);

    .comment-avater {
      object-fit: cover;
      margin-left: 1rem;
      width: 64px;
      height: 64px;
      border: 1px solid var(--border);
      border-radius: 50%;
    }

    .comment-info {
      display: flex;
      flex-direction: column;
      padding-left: 0.33rem;

      .comment-username {
        color: var(--text-secondary);
      }
      .comment-date {
        font-size: 0.9rem;
        color: var(--text-secondary);
        padding-left: 0.33rem;
      }
      .comment-at {
        color: var(--text-primary);
        padding-right: 0.33rem;
   
      }
      .comment-btn-reply {
        color: var(--text-primary);
        font-size: .9rem;
        padding: 0 .2rem;
        margin-left: .33rem;
        &:hover {
          background: var(--theme-primary);
          color: var(--text);
        }
      }
      .comment-content {
        color: var(--text);
      }
    }
  }
}
.btn-reply {
  // background-color #ccc
  border-radius: 10%;
  color: teal;
  transition: 0.3s;
  &:hover {
    background-color: teal;
    color: white;
  }
}
</style>