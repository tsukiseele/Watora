<template lang="pug">
.comment-wrap
  .comment(v-for="(item, index) in comments", :key="index")
    .comment-body
      img.comment-avater(:src="item.visitor.visitorIcon || defaultIcon")
      .comment-info
        .comment-title
          span.comment-name {{ item.visitor.visitorName }}
          span.comment-date {{ item.comment.commentDatetime | formatDate('yyyy-MM-dd hh:mm') }}
          .spacer(style="flex-grow: 1")
          SvgIcon.comment-reply-btn(type="mdi", :path="icons.mdiReply")

        CommentChild(v-if="item.childs", :comments="item.childs")
        .comment-content 
          span.comment-at(v-if="at && at !== item.visitor.visitorName") @{{ at }}
          span {{ item.comment.commentContent }}
    //- .comment-reply(v-if="item.childs", :class="{ child: isIndent(99) }")
      //- Comment(
      //-   :deep="deep + 1",
      //-   :comments="item.childs",
      //-   :reply="reply",
      //-   :at="item.visitor.visitorName"
      //- )
</template>

<script>
import { mdiReply } from "@mdi/js";
export default {
  name: "SComment",
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
    icons: {
      mdiReply,
    },
    hover: false,
  }),
  computed: {
    
    defaultIcon () {return this.$statics.images.avatar},
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
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
      // border: 1px solid var(--border);
      border-radius: 0;
      
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
      transition: .3s ease;
      &:hover {
        transform: rotate(360deg);
        border-radius: 50%;
      }
    }

    .comment-name {
      color: var(--theme);
    }

    .comment-info {
      flex: 1;
      display: flex;
      background-color: var(--card);
      padding: 1rem;
      box-shadow: 0 14px 38px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.06);
      border-radius: 0.33rem;
      flex-direction: column;

      .comment-title {
        display: flex;
        align-items: baseline;
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
      .comment-reply-btn {
        color: var(--text-primary);
        height: 1.3rem;
        border-radius: 50%;
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