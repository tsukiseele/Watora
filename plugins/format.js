/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/;
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/;
export const formatPost = post => {
  const { body, updated_at } = post;
  const result = regex.exec(body);
  const cover = coverRegex.exec(result[1]);
  if (cover && cover.length === 3) {
    post.cover = {
      title: cover[1],
      src: cover[2]
    };
    post.description = result[2];
  } else {
    post.cover = {
      title: "",
      src: "x" || config.defaultCover
    };
    post.description = result[1];
  }
  post.created_at = new Date(updated_at).formatTimeAgo(); //format(created_at, "zh_CN").replace(/\s/, "");
  return post;
};

/**
 * 格式化分类
 */
export const formatCategory = category => {
  category.forEach(o => {
    const description = o.description.split("\r\n");
    o.summary = description[0].split("summary:")[1];
    o.cover = description[1].split("cover:")[1];
  });
  return category;
};

/**
 * 格式化灵感
 */
export const formatInspiration = inspiration => {
  inspiration.forEach(
    o => (o.date = parseTime(o.created_at, "{y}年{m}月{d}日"))
  );
  return inspiration;
};

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data || !data.body) return [];
  let section = data.body.split("## ").filter(o => o.length);

  switch (type) {
    case "book":
    case "friend":
      section = section.map(o => {
        const content = o.split("\r\n").filter(o => o.length);
        const result = {};
        content.forEach((row, index) => {
          if (index === 0) {
            result.name = row;
          } else {
            const inx = row.indexOf(":");
            const key = row.slice(0, inx);
            const value = row.slice(inx + 1);
            result[key] = value;
          }
        });
        return result;
      });
      break;
    case "about":
      section = section.map(o => {
        const title = o.match(/.+?\r\n/)[0];
        return {
          title,
          content: o.slice(title.length)
        };
      });
      break;
    default:
      break;
  }
  // 移除首尾空格
  section.forEach(item => {
    Object.keys(item).forEach(k => {
      item[k] = item[k].trim();
    });
  });

  return section;
};

/**
 * 日期转换
 */
export const parseTime = (time, format = '{y}-{m}-{d} {h}:{i}:{s}') => {
  const date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
