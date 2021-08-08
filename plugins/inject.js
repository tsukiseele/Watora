import Cookie from 'js-cookie'
import Md5 from 'blueimp-md5'

export default ({
  app
}, inject) => {
  // 静态资源位置
  inject("static", "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static")
  // 获取服务端cookie
  inject("getCookiesInServer", function (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  });
  // MD5
  inject("md5", Md5);
  // 占位符
  inject("placeholder", "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=");
  // 判断客户端类型
  inject("mobile", function () {
    if (process.env.client) {
      const width = document.documentElement.offsetWidth || document.body.offsetWidth;

      return width < 768;
    }
    return false;
  });
}
