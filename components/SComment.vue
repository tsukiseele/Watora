<template lang="pug">
.comment.card
  Vssue(:title="title")
</template>

<script>
import { mdiReply } from "@mdi/js";
export default {
  name: "SComment",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
  mounted() {
    console.log(this.title);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .vssue {
  a {
    &::before,
    &::after {
      display: none;
    }
  }
}
.comment {
  background-color: var(--card);
  margin: 0;
}
</style>