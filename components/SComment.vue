<template lang="pug">
.comment
  Vssue(:title="title")
</template>

<script>
import { mdiReply } from "@mdi/js";
export default {
  name: "SComment",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
    console.log(this.title);
  },
};
</script>

<style lang="scss" scoped>

</style>