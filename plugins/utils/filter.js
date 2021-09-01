import Vue from "vue";
import * as timeago from "timeago.js";
const locale = function(number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  const map = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  return [
    ['现在', '刚刚'],
    ['%s秒前', '在%s秒内'],
    ['一分钟前', '一分钟内'],
    ['%s分钟前', '%s分钟内'],
    ['一小时前', '一小时内'],
    ['%s小时前', '%s小时内'],
    ['一天前', '一天内'],
    ['%s天前', '%s天内'],
    ['一周前', '一周内'],
    ['%s周前', '%s周内'],
    ['一个月前', '一个月内'],
    ['%s月前', '%s个月内'],
    ['一年前', '一年内'],
    ['%s年前', '%s年内']
  ][index];
};
timeago.register('pt_BR', locale);

/**
 * 格式化日期，过去式
 */
Vue.filter("formatTimeAgo", function (time) {
  console.log(Number(5454445).toChineseNumber());
  return timeago.format(new Date(time), "pt_BR");
});

/**
 * 格式化时间
 */
Vue.filter("formatDate", function(date, format) {
  if (date) {
    date = date instanceof Date ? date : new Date(date);
    if (format) {
      return date.format(format);
    } else {
      return date.format("yyyy-MM-dd hh:mm:ss");
    }
  }
});
