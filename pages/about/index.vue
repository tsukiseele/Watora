<template lang="pug">
#main.card
  TheBanner(
    :title="header.title",
    :subtitle="header.subtitle",
    :isFull="header.isFull",
    :isHide="header.isHide",
    :isHideSubtitle="header.isHideSubtitle"
  )
  .about
    .blockquote
      i.fa.fa-quote-left
      .quote-content 纵使孤身一人，也要前进
      i.fa.fa-quote-right
</template>
<script>
export default {
  data: () => ({
    header: {
      title: "ABOUT",
      subtitle: "",
    },
  }),
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

