/**
 * 将Date格式化为指定格式
 * new Date().format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * new Date().format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param {String} fmt
 * @returns
 */
Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
  const date = this instanceof Date ? this : new Date(this)
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  for (const k in o) {
    const match = new RegExp(k).exec(fmt)
    fmt = match && match[0] ? fmt.replace(match, match[0].length == 1 ? o[k] : o[k].toString().padStart(match[0].length, '0')) : fmt
  }
  return fmt
}

/**
 * 获取数字的中文表示形式
 * @param {Number} num
 * @returns
 */
Number.prototype.toChineseNumber = function(num = this) {
  if (isNaN(parseInt(num))) {
    return num
  }
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const chnUnitChar = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '兆', '十', '百', '千']
  const mustUnits = ['万', '亿', '兆']
  const zero = '零'
  let chnStr = ''
  let str = parseInt(num).toString()
  while (str.length > 0) {
    const tmpNum = chnNumChar[parseInt(str.substring(0, 1))]
    const tmpUnit = chnUnitChar[str.length - 1]
    chnStr += chnStr.substring(-1) == zero && tmpNum == zero ? '' : tmpNum
    chnStr += tmpNum == zero ? '' : tmpUnit
    if (tmpNum == zero && mustUnits.indexOf(tmpUnit) !== -1) {
      if (chnStr.substring(-1) == zero) {
        chnStr = chnStr.substring(0, chnStr.length - 1)
      }
      chnStr += tmpUnit
    }
    str = str.substring(1)
  }
  if (chnStr.length > 1) {
    chnStr = chnStr.substring(-1) == zero ? (chnStr = chnStr.substring(0, chnStr.length - 1)) : chnStr
    chnStr = chnStr.substring(0, 1) == zero ? (chnStr = chnStr.substring(1)) : chnStr
    if (chnStr.substring(0, 2) == '一十') {
      chnStr = chnStr.substring(1)
    }
  }
  return chnStr
}

/**
 * js截取字符串，对中英文做相应的处理，
 * 如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
 * @param {Number} len: 需要截取的长度
 */
String.prototype.cut = function(length) {
  const getLocalLength = function(str) {
    let realLength = 0,
      len = str.length,
      charCode = -1
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) realLength += 1
      else realLength += 2
    }
    return realLength
  }
  const cutString = function(str, len) {
    let strLength = 0
    let strCut = new String()
    for (let i = 0; i < str.length; i++) {
      a = str.charAt(i)
      strLength++
      if (decodeURI(a).length > 4) {
        //中文字符的长度经编码之后大于4
        strLength++
      }
      strCut = strCut.concat(a)
      if (strLength >= len) {
        strCut = strCut.concat('...')
        return strCut
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (strLength < len) {
      return str
    }
  }
  if (getLocalLength(this) > length) {
    return cutString(this, length)
  }
  return this
}
