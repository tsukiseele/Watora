const regLine = new RegExp(".+", "gm");
const regImg = new RegExp(
  "\\[(.*?)\\].*?(https?:\\/\\/.+?.(?:jpg|jpeg|png|gif).*?)",
  "g"
);

/**
 * 将文本行转换为列表
 * @param {String} post
 * @returns {Array<String>}
 */
function getPartList(post) {
  let match;
  const result = [];
  while ((match = regLine.exec(post))) {
    result.push(match[0]);
  }
  return result;
}
/**
 * 获取Markdown文本的图片数据
 * @param {String} content
 * @returns {Array<Cover>} [{ title, url }, ...]
 */
function getImages(content) {
  const images = [];
  let match;
  while ((match = regImg.exec(content))) {
    if (match.length > 2) {
      images.push({
        title: match[1],
        url: match[2]
      });
    }
  }
  return images;
}
/**
 * 替换资源链接为 jsDelivr CDN链接
 * @param {String} post 文章上下文
 * @param {Array<Image>} images 图片
 */
function useCdn(content, images) {
  images.forEach(image => {
    if (image && image.url) {
      const cdnUrl = image.url
        .replace("raw.githubusercontent.com", "cdn.jsdelivr.net/gh")
        .replace(/\/(main|master)\//g, "/");
      content.replace(image.url, cdnUrl);
    }
  });
  return content;
}
/**
 *
 */
export const formatPost = ({
  body,
  title,
  created_at: createAt,
  labels,
  milestone: category,
  number: id
}) => {
  const images = getImages(body);
  // 使用 CDN
  const content = useCdn(body, images);
  // 获取所有行
  const lines = getPartList(content);
  // 获取封面图 （默认为第一张图片）
  const cover = images[0] || {
    title: "",
    url: "https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static/icon/icon.png"
  };
  // 获取描述，查找首个非图片行
  const description = lines.find(line => !getImages(line).length);
  //
  return {
    content,
    cover,
    description,
    title,
    createAt,
    labels,
    category,
    id
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
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
};
