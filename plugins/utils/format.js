/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/; // 匹配第一个段落的内容
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/; // 匹配文章封面
export const formatPost = post => {
  const result = { };
  const desc = regex.exec(post.body);
  const cover = coverRegex.exec(desc[1]);
  if (cover && cover.length === 3) {
    result.cover = {
      title: cover[1],
      src: cover[2]
    };
    result.description = desc[2];
  } else {
    result.cover = {
      title: "",
      src: "" //resource.images.placeholder
    };
    result.description = desc[1];
  }
  // console.log(resource.images.placeholder);
  result.title = post.title;
  result.content = post.body;
  result.createAt = post.created_at;
  result.labels = post.labels;
  result.category = post.milestone;
  result.id = post.number;
  return result;
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
