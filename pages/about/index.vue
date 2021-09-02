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
#main {
  margin: 0 auto;
}
.about {
  .blockquote {
    display: flex;
    line-height: 5rem;
    padding: 1rem;
    color: var(--text);
    i {
      font-size: 1.5rem;
    }
    .fa-quote-left {
      align-self: flex-start;
    }
    .fa-quote-right {
      align-self: flex-end;
    }
    .quote-content {
      text-align: center;
      flex: 1;
      padding: 1rem;
      align-self: center;
      font-size: 1.5rem;
    }
  }
}
</style>

