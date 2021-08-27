<template lang="pug">
#container 
  .card(v-if="user")
    p ID：{{ user.userId }}
    p 用户名：{{ user.userName }}
    p 邮箱：{{ user.userEmail }}
    p 最后登录IP：{{ user.userLastLoginIp }}
    p 最后登录时间：{{ user.userLastLoginTime }}
</template>

<script>
import Cookies from "js-cookie";

export default {
  layout: "backend",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    /*
    this.$nextTick(() => {
      if (
        this.user == undefined ||
        this.user == null ||
        this.user.userId == undefined ||
        this.user.userId == null
      ) {
        setTimeout(() => {

        console.log(this.user);
        Cookies.set("token", null);
        this.$router.push("/login");
        }, 0)
      }
    });*/
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
}
</style>