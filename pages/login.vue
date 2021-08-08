<template lang="pug">
#container 
  main#dialog
    .kanban
      img.icon(:src="icon.current")
      .error(v-show="error.show", :style="{ color: error.color }") {{ error.message }}
    form#form
      .input-box
        span 账号：
        input(v-model="user.email", type="text", name="username")
      .input-box
        span 密码：
        input(v-model="user.password", type="password", name="paasword")
      .option
        input(value="取消", type="button", name="cancel", @click="handleCancel")
        input(value="登录", type="button", name="submit", @click="handleSubmit")   
</template>

<script>
import Cookies from "js-cookie";

export default {
  layout: "blank",
  // 简单验证用户状态即可
  /*
  async fetch({ app, store, redirect, req }) {
    const token = app.$getCookiesInServer(req).token;
    // 已经登录则跳转到后台
    if (token) {
      try {
        const user = await app.$api.auth();
        if (user) {
          store.commit("setUser", user);
          redirect("/admin");
        }
      } catch (e) {}
    }
  },*/
  data: () => ({
    icon: {
      current:
        "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/login_icon.png",
      ok:
        "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/login_icon.png",
      failed:
        "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/login_icon.png"
    },
    dialog: true,
    error: {
      show: false,
      message: "",
      color: ""
    },
    user: {
      email: "",
      password: ""
    }
  }),
  methods: {
    async handleSubmit() {
      try {
        let result = await this.$api.login(this.user.email, this.user.password);
        if (result) {
          // 写入Cookie后跳转
          Cookies.set("token", result.token);
          this.$store.commit("user", result.user);
          this.$router.push("/admin");
          this.error.color = "green";
          this.error.message = "正在跳转中。。。";
          this.error.show = true;
          this.icon.current = this.icon.ok;
        }
      } catch (e) {
        // 弹出错误信息
        this.error.color = "red";
        this.error.message = "用户名Orz密码错误";
        this.error.show = true;
        this.icon.current = this.icon.failed;
      }
    },
    // 跳转到主页
    handleCancel() {
      this.$router.push("/");
      this.dialog = false;
    },
    // 检查是否已经登录，若已经登录则跳转到后台
    async checkLogin() {
      const token = Cookies.get("token");
      if (token) {
        try {
          const user = await this.$api.auth();
          if (user) {
            this.$store.commit("user", user);
            this.$router.replace("/admin");
          }
        } catch (e) {}
      }
    }
  },
  mounted() {
    this.checkLogin();
  }
};
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
  background: var(--primary-dark);
}
#dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 33vw;
  box-shadow: 0px 0px 12px var(--primary);
  border-radius: 3px;
  padding: 1rem;
  background-color: var(--primary);
}

.kanban {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 128px;
  height: 128px;
  object-fit: cover;
  text-align: center;
  margin: 1rem;
}

#form {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;

  input {
    border: 1px solid var(--primary-dark);
    margin: 0.33rem;
    padding: 0.1rem 0.33rem;
    border-radius: 5px;
    font-family: InfoDisplay;
    &[type="button"] {
      flex-grow: 1;
      font-size: 0.9rem;
    }
  }
}
.option {
  display: flex;
  width: 100%;
  margin-top: 1rem;
}
.error {
  font-size: 0.9rem;
}
</style>
