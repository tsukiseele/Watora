/**
 * 将Date格式化为指定格式
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q)，可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param {String} fmt
 * @returns
 */
Date.prototype.format = function(fmt = "yyyy-MM-dd hh:mm:ss") {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

/**
 * 获取指定日期过去式的中文表示形式
 * @param {Date} time
 * @returns
 */
Date.prototype.formatTimeAgo = function(time) {
  if (time) {
    var date = new Date(time);
    var difftime = Math.abs(new Date() - date);
    // 获取当前时间的年月
    var nowyear = date.getFullYear();
    var nowmonth = date.getMonth + 1;
    var yearAllday = 0;
    var monthAllday = 0;
    // 判断是否为闰年
    if ((nowyear % 4 === 0 && nowyear % 100 !== 0) || nowyear % 400 === 0) {
      yearAllday = 366;
    } else {
      yearAllday = 365;
    }
    // 每个月的天数
    if (yearAllday === 366 && nowmonth === 2) {
      monthAllday = 29;
    } else if (yearAllday === 365 && nowmonth === 2) {
      monthAllday = 28;
    }
    if (nowmonth === 4 || nowmonth === 6 || nowmonth === 9 || nowmonth === 11) {
      monthAllday = 30;
    } else {
      monthAllday = 31;
    }
    if (difftime > yearAllday * 24 * 3600 * 1000) {
      var yearNum = Math.floor(difftime / (yearAllday * 24 * 3600 * 1000));
      return yearNum + " 年前";
    } else if (
      difftime > monthAllday * 24 * 3600 * 1000 &&
      difftime < yearAllday * 24 * 3600 * 1000
    ) {
      var monthNum = Math.floor(difftime / (monthAllday * 24 * 60 * 60 * 1000));
      return monthNum + " 个月前";
    } else if (
      difftime > 7 * 24 * 60 * 60 * 1000 &&
      difftime &&
      difftime < monthAllday * 24 * 60 * 60 * 1000
    ) {
      var weekNum = Math.floor(difftime / (7 * 24 * 3600 * 1000));
      return weekNum + " 周前";
    } else if (difftime < 7 * 24 * 3600 * 1000 && difftime > 24 * 3600 * 1000) {
      var dayNum = Math.floor(difftime / (24 * 60 * 60 * 1000));
      return dayNum + " 天前";
    } else if (difftime < 24 * 3600 * 1000 && difftime > 3600 * 1000) {
      var dayNum = Math.floor(difftime / (60 * 60 * 1000));
      return dayNum + " 小时前";
    } else if (difftime < 3600 * 1000 && difftime > 0) {
      var dayNum = Math.floor(difftime / (60 * 1000));
      return dayNum + " 分钟前";
    } else if (difftime < 60 * 1000 && difftime > 0) {
      return "刚刚";
    }
  }
};
/**
 * js截取字符串，对中英文做相应的处理，
 * 如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
 * @param {Number} len: 需要截取的长度
 */
String.prototype.cut = function(length) {
  let getLocalLength = function(str) {
    var realLength = 0,
      len = str.length,
      charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  };
  let cutString = function(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
      a = str.charAt(i);
      str_length++;
      if (escape(a).length > 4) {
        //中文字符的长度经编码之后大于4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if (str_length >= len) {
        str_cut = str_cut.concat("...");
        return str_cut;
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
      return str;
    }
  };
  if (getLocalLength(this) > length) {
    return cutString(this, length);
  }
  return this;
};
