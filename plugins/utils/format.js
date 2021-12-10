const regLines = new RegExp('.+', 'gm')
const regImages = new RegExp('!\\[(.*?)\\].*?\\(((?:https?:\\/\\/|\\/\\/).+?\\.(?:webp|png|gif|jpg|jpeg|jfif)(?:\\?[\\w_=\\-%]+?|))\\)', 'g')
const regTitles = new RegExp('^(#+)\\s+(.+)', 'gm')
const regBranches = new RegExp('(main|master)\\/', 'g')

const RAW_URL = 'raw.githubusercontent.com'
const CDN_URL = 'cdn.jsdelivr.net/gh'

/**
 * 替换资源链接为 jsDelivr CDN链接
 * @param {String} markdown
 * @return {String, Array<Image>} { markdown, images[{ title, url }, ...] }
 */
function initMarkdown(markdown) {
  const images = getImages(markdown)
  if (RAW_URL && CDN_URL) {
    images.forEach(image => {
      if (image && image.url) {
        const cdnUrl = image.url.replace(RAW_URL, CDN_URL).replace(regBranches, '')
        markdown = markdown.replace(image.url, cdnUrl)
        image.url = cdnUrl
      }
    })
  }
  return { markdown, images }
}
/**
 *
 * @param {String} markdown
 * @returns
 */
function getTitles(markdown) {
  let match = null
  const menu = []
  let index = 0
  while ((match = regTitles.exec(markdown))) {
    if (match.length > 2) {
      menu.push({ level: match[1].length, id: `md-title${index ? `-${index}` : ''}`, title: match[2] })
      index++
    }
  }
  return menu
}
/**
 * 获取Markdown文本的图片数据
 * @param {String} markdown
 * @returns {Array<Cover>} [{ title, url }, ...]
 */
function getImages(markdown) {
  const images = []
  let match
  while ((match = regImages.exec(markdown))) {
    if (match.length > 2) {
      images.push({
        title: match[1],
        url: match[2],
      })
    }
  }
  return images
}
/**
 * 将文本行转换为列表
 * @param {String} markdown
 */
function getLines(markdown) {
  let match
  const result = []
  while ((match = regLines.exec(markdown))) {
    result.push(match[0])
  }
  return result
}
/**
 *
 * @param {*} param0
 * @returns
 */
export const formatGallery = ({ body }) => {
  return initMarkdown(body).images
}
/**
 * @param {Post} post 响应body
 */
export const formatPost = ({ body, title, created_at: createAt, labels, milestone: category, number: id }) => {
  // 使用 CDN
  const { markdown, images } = initMarkdown(body)
  // 获取封面图 （默认为第一张图片）
  const cover = images[0] || {
    title: '',
    url: 'x',
  }
  // 获取描述，查找首个非图片行
  const description = getLines(markdown).find(line => !getImages(line).length)
  // 生成导航菜单
  const nav = getTitles(markdown)
  return { markdown, cover, description, title, createAt, labels, category, id, nav }
}
/**
 * 格式化分类
 */
export const formatCategory = category => {
  category.forEach(o => {
    const description = o.description.split('\r\n')
    o.summary = description[0].split('summary:')[1]
    o.cover = description[1].split('cover:')[1]
  })
  return category
}
/**
 * 格式化时间线
 */
export const formatTimeline = posts => {
  const archives = posts.map(item => formatPost(item))
  const timeline = {}
  Object.values(archives).forEach(archive => {
    const timestrap = new Date(archive.createAt).format('yyyy-MM')
    if (timeline[timestrap]) {
      timeline[timestrap].push(archive)
    } else {
      timeline[timestrap] = [archive]
    }
  })
  return timeline
}
/**
 * 格式化灵感
 */
export const formatInspiration = inspiration => {
  inspiration.forEach(o => (o.date = new Date(o.created_at).format('y年m月d日')))
  return inspiration
}

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data || !data.body) return []
  let section = data.body.split('## ').filter(o => o.length)

  switch (type) {
    case 'book':
    case 'friend':
      section = section.map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        const result = {}
        content.forEach((row, index) => {
          if (index === 0) {
            result.name = row
          } else {
            const inx = row.indexOf(':')
            const key = row.slice(0, inx)
            const value = row.slice(inx + 1)
            result[key] = value
          }
        })
        return result
      })
      break
    case 'about':
      section = section.map(o => {
        const title = o.match(/.+?\r\n/)[0]
        return {
          title,
          content: o.slice(title.length),
        }
      })
      break
    default:
      break
  }
  // 移除首尾空格
  section.forEach(item => {
    Object.keys(item).forEach(k => {
      item[k] = item[k].trim()
    })
  })

  return section
}

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
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
