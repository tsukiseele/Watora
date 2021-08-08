import Cookies from "js-cookie"

/**
 * 权限认证
 */
export default async function ({ app, route, store, env, redirect, req }) {
  const KEY_TOKEN = "token";
  let token;
  
  if (process.server) {
    const serverCookies = app.$getCookiesInServer(req);
    token = serverCookies.token;
  }
  if (process.client) {
    token = Cookies.get(KEY_TOKEN);
  }

  // 用于清除用户状态并跳转登录
  const redirectLogin = function () {
    Cookies.remove(KEY_TOKEN);
    store.commit("user", null);
    redirect("/login");
  }
  if (token) {
    try {
      let user = await app.$api.auth(token);
      if (user) {
        // 口令有效，更新用户状态
        store.commit("user", user);
      } else {
        // 口令失效
        redirectLogin();
      }
    } catch {
      // 口令失效
      redirectLogin();
    }
  } else {
    // 无口令
    redirectLogin();
  }
}