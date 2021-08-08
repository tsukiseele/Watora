import Vue from 'vue'

/**
 * 格式化日期，过去式
 */
Vue.filter('formatDateAgo', function (time) {
  if (time) {
    var date = new Date(time);
    var difftime = Math.abs(new Date() - date)
    // 获取当前时间的年月
    var nowyear = date.getFullYear();
    var nowmonth = date.getMonth + 1;
    var yearAllday = 0;
    var monthAllday = 0;
    // 判断是否为闰年
    if ((nowyear % 4 === 0 && nowyear % 100 !== 0) || nowyear % 400 === 0) {
      yearAllday = 366
    } else {
      yearAllday = 365
    }
    // 每个月的天数
    if (yearAllday === 366 && nowmonth === 2) {
      monthAllday = 29
    } else if (yearAllday === 365 && nowmonth === 2) {
      monthAllday = 28
    }
    if (nowmonth === 4 || nowmonth === 6 || nowmonth === 9 || nowmonth === 11) {
      monthAllday = 30
    } else {
      monthAllday = 31
    }
    if (difftime > yearAllday * 24 * 3600 * 1000) {
      var yearNum = Math.floor(difftime / (yearAllday * 24 * 3600 * 1000))
      return yearNum + " 年前"
    } else if (difftime > monthAllday * 24 * 3600 * 1000 && difftime < yearAllday * 24 * 3600 * 1000) {
      var monthNum = Math.floor(difftime / (monthAllday * 24 * 60 * 60 * 1000))
      // 拼接
      return monthNum + " 个月前";
    } else if (difftime > 7 * 24 * 60 * 60 * 1000 && difftime && difftime < monthAllday * 24 * 60 * 60 * 1000) {
      var weekNum = Math.floor(difftime / (7 * 24 * 3600 * 1000))
      return weekNum + " 周前";
    } else if (difftime < 7 * 24 * 3600 * 1000 && difftime > 24 * 3600 * 1000) {
      // //注释("一周之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(difftime / (24 * 60 * 60 * 1000));
      return dayNum + " 天前";
    } else if (difftime < 24 * 3600 * 1000 && difftime > 3600 * 1000) {
      // //注释("一天之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(difftime / (60 * 60 * 1000));
      return dayNum + " 小时前";

    } else if (difftime < 3600 * 1000 && difftime > 0) {
      // //注释("一小时之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(difftime / (60 * 1000));
      return dayNum + " 分钟前";
    }
  }
})

/**
 * 格式化时间
 */
Vue.filter('formatDate', function (date, format) {
  if (date) {
    date = date instanceof Date ? date : new Date(date);
    if (format) {
      return date.format(format);
    } else {
      return date.format("yyyy-MM-dd hh:mm:ss");
    }
  }
})