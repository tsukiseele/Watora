import Statics from '@/assets/resource/statics.js'
// import ColorThief from "";

export default ({ app }, inject) => {
  // 静态资源位置
  inject('static', 'https://cdn.jsdelivr.net/gh/tsukiseele/awsl.re/static')
  // 占位符
  inject('placeholder', 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=')
  inject('src', initResource())
  inject('isNight', isNight)
}

function isNight() {
  var hour = new Date().getHours()
  return hour < 7 || hour > 18
}

function initResource() {
  const res = {}
  Object.keys(Statics.resource).forEach(type => {
    const obj = Statics.resource[type]
    res[type] = res[type] || {}
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (val instanceof Array) {
        res[type][key] = []
        val.forEach(v => res[type][key].push(`${Statics.prefix}${v}`))
      } else {
        res[type][key] = `${Statics.prefix}${val}`
      }
    })
  })
  return res
}
