<template lang="pug">
client-only
  aplayer(fixed hideLrc="true" crossOrigin=“” :audio="musics" :lrcType="3" )
</template>

<script>
export default {
  props: {
    musics: Array,
  },
};
</script>
<style lang="scss">
.aplayer .aplayer-lrc {
  display: none !important;
}
</style>