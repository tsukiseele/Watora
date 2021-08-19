<template lang="pug">
.comment-childs
  .comment-child(v-for="(comment, i) in comments", :key="i")
    .comment-at @{{ comment.visitor.visitorName }}
    .comment-cnt {{ comment.comment.commentContent }}
    CommentChild(v-if="comment.childs", :comments="comment.childs")
</template>

<script>
export default {
  name: "SCommentChild",
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
  data: () => ({}),
  methods: {},
  mounted() {
    console.log(this.comments);
  },
};
</script>

<style lang="scss" scoped>
.comment-child {
  border-left: 3px solid var(--theme);
  padding-left: 1rem;

  color: var(--text);
}
.comment-at {
  color: var(--theme);
}
</style>