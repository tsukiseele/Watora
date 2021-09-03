const lineReg = new RegExp(".+", "gm");///.+/gm;
const imgReg = new RegExp(
  "\\[(.*?)\\].*?(https?:\\/\\/.*?.(?:jpg|jpeg|png|gif))",
  "g"
); ///^\[(.*?)\].*?(https?:\/\/.*?\.(?:jpg|jpeg|png|gif))/g; // 匹配文章封面
/**
 * 将文本行转换为列表
 * @param {String} post
 * @returns {Array<String>}
 */
function getPartList(post) {
  let match;
  const result = [];
  while ((match = lineReg.exec(post))) {
    result.push(match[0]);
  }
  return result;
}
/**
 * 获取Markdown文本的图片数据
 * @param {String} content
 * @returns {Cover} { title, url }
 */
function getImage(content) {
  const cover = imgReg.exec(content);
  if (cover && cover.length > 2) {
    return {
      title: cover[1],
      url: cover[2]
    };
  }
  return cover;
}
/**
 * 替换资源链接为 jsDelivr CDN链接
 * @param {String} post 文章上下文
 * @param {Array<String>} lines 文章行列表
 */
function useCdn(post, lines) {
  lines.forEach(line => {
    const image = getImage(line);
    if (image && image.url) {
      const cdnUrl = image.url
        .replace("raw.githubusercontent.com", "cdn.jsdelivr.net/gh")
        .replace(/\/(main|master)\//g, "/");
      post.replace(image.url, cdnUrl);
    }
  });
}

/**
 *
 */
export const formatPost = post => {
  // 获取所有行
  const lines = getPartList(post.body);
  // 使用 CDN
  const content = useCdn(post.body, lines);
  // 获取封面图 （默认为第一张图片）
  const cover = getImage(lines[0]) || { title: null, url: null };
  // 获取描述，有封面使用第二行，没有则使用第一行
  const description = cover.url ? lines[1] : lines[0];
  return {
    content,
    cover,
    description,
    title: post.title,
    createAt: post.created_at,
    labels: post.labels,
    category: post.milestone,
    id: post.number
  };
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
export const parseTime = (time, format = "{y}-{m}-{d} {h}:{i}:{s}") => {
  const date = new Date(time);
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
};
