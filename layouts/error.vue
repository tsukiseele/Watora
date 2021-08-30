<template lang="pug">
.__nuxt-error-page
  .error (╯°□°)╯︵ ┻━┻
  div
    .details(v-if="statusCode === 404") Not Found
    NuxtLink.back.error-link(to="/") 返回主页
//-   <div class="error">
//-     <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
//-       <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
//-     </svg>

//-     <div class="title">{{ message }}</div>
//-     <p v-if="statusCode === 404" class="description">
//-       <a v-if="typeof $route === 'undefined'" class="error-link" href="/">返回主页</a>
//-       <NuxtLink v-else class="error-link" to="/">返回主页</NuxtLink>
//-     </p>
//-     <p class="description" v-else>error</p>

//-     <div class="logo">
//-       <a href="https://nuxtjs.org" target="_blank" rel="noopener">NUXT.JS</a>
//-     </div>
//-   </div>
//- </div>
</template>

<script>
export default {
  layout: "blank",
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || "<%= messages.client_error %>";
    },
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
        },
      ],
    };
  },
};
</script>

<style>
.__nuxt-error-page {
  padding: 1rem;
  background: #f7f8fb;
  color: #47494e;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.error {
  font-family: Epilogue, ui-serif, Georgia, Cambria, "Times New Roman", Times,
    serif;
  font-size: 4rem;
}

.details {
  font-size: 2rem;
}

.back {
  font-size: 1.5rem;
}
</style>