<template lang="pug">
#footer
  .footer-wrap
    .footer-info
      div
        img(src="https://count.getloli.com/get/@nlo.li?theme=rule34" alt="counter")
      p © {{ new Date().getFullYear() }} by 
        a.info--developer(href="https://github.com/tsukiseele" target="_blank") TsukiSeele 
        | All Rights Reserved.
      p Powered by 
        a.info--nuxtjs(href="https://nuxtjs.org/" target="_blank") Nuxt.js
        |.
        span.info--spacer |
        |Theme 
        a.info--theme(href="https://github.com/tsukiseele/Watora" target="_blank") Watora
        |.
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100px;
  padding: 0.5rem 0;
  font-family: InfoDisplay;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.footer-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info--developer {
  color: #b854d4;
}

.info--nuxtjs {
  color: #00c58e;
}

.info--theme {
  color: rgba(139, 207, 222, 1);
}

.info--spacer {
  margin: 0 0.5rem;
}
</style>
