import Vue from 'vue'

/**
 * 格式化日期，过去式
 */
Vue.filter("formatTimeAgo", function(time) {
  return new Date(time).formatTimeAgo();
});

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