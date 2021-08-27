<template lang="pug">
#container 
  main#dialog.card
    #board-wrap 
      #board
        //- .kanban
        //-   img.icon(:src="icon.current")
        //-   .error(v-show="error.show", :style="{ color: error.color }") {{ error.message }}
        form#form
          .input-box
            span 账号：
            input(v-model="user.email", type="text", name="username")
          .input-box
            span 密码：
            input(v-model="user.password", type="password", name="paasword")
          .option
            input(
              value="取消",
              type="button",
              name="cancel",
              @click="handleCancel"
            )
            input(
              value="登录",
              type="button",
              name="submit",
              @click="handleSubmit"
            ) 
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
          redirect("/backend");
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
        "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/login_icon.png",
    },
    dialog: true,
    error: {
      show: false,
      message: "",
      color: "",
    },
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async handleSubmit() {
      try {
        const resp = await this.$api.login({ userEmail: this.user.email, userPassword: this.user.password});
        if (resp.ok) {
          const result = resp.data;
          console.log(result);
          // 写入Cookie后跳转
          Cookies.set("token", result.token);
          this.$store.commit("user", result.user);
          this.$router.push("/backend");
          this.error.color = "green";
          this.error.message = "正在跳转中。。。";
          this.error.show = true;
          this.icon.current = this.icon.ok;
        }
      } catch (e) {
        // 弹出错误信息
        this.error.color = "red";
        this.error.message = "用户名或密码错误";
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
            this.$router.replace("/backend/");
          }
        } catch (e) {}
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
}
#dialog {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#board-wrap {
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 100vh;
    width: 5px;
    bottom: 100%;
    background-color: var(--theme);
    box-shadow: 0px 0px 6px var(--theme);
  }

  &::before {
    left: 20%;
    animation: tran 10s linear infinite;
  }
  
  &::after {
    right: 20%;
    animation: tran 10s linear -5s infinite;
  }

  @keyframes tran {
    0% {
      transform: translate(2px) rotate(0.5deg);
    }
    50% {
      transform: translate(-2px) rotate(-0.5deg);
    }
    100% {
      transform: translate(2px) rotate(0.5deg);
    }
  }
  @media screen and (max-width: $mobile) {
    &::after {
      display: none;
    }
    &::before {
      display: none;
    }
  }
}
#board {
  position: relative;
  background-color: var(--theme);
  box-shadow: 0px 0px 12px var(--theme);
  border-radius: 3px;
  padding: 1rem;
  animation: anim 10s linear infinite;
  @keyframes anim {
    0% {
      transform: translate(2px) rotate(1deg);
    }
    50% {
      transform: translate(-2px) rotate(-1deg);
    }
    100% {
      transform: translate(2px) rotate(1deg);
    }
  }
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
    border: 1px solid var(--card);
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
