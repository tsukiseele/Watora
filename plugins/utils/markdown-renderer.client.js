// see https://marked.js.org/using_pro#renderer
import marked from 'marked'
import katex from 'katex'
import DOMPurify from 'dompurify'

const hljs = require('@/plugins/utils/highlight.js')
/*
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/styles/night-owl.css";
*/
const renderer = new marked.Renderer()

let titles = []
let codeBlockId = 0
/**
 * 代码块与数学公式
 * @param {*} code
 * @param {*} lang
 * @param {*} isEscaped
 * @returns
 */
renderer.code = function(code, lang, isEscaped) {
  switch (lang = lang ? lang.toLocaleLowerCase().trim() : '') {
    case 'math':
    case 'latex':
    case 'katex':
      try {
        const math = katex.renderToString(code, { displayMode: true })
        if (math) return math
      } catch (error) {
        console.warn(error)
      }
      break
  }
  const id = `code-${++codeBlockId}`
  const langClass = this.options.langPrefix + lang
  if (this.options.highlight) code = this.options.highlight(code, lang) || code
  return `
    <pre class="hljs${langClass}">
      <div class="code-options"><i data-copy="${id}" class="material-icons md-code-copy">content_paste</i></div>
      <div class="code-wrap"><code class="${langClass}" id="${id}">${code}</code></div>
    </pre>\n`
}

/**
 * 内联代码与数学公式
 * @param {*} text
 * @returns
 */
const rendererCodespan = renderer.codespan
renderer.codespan = function(text) {
  try {
    return mathsExpression(text) || rendererCodespan(text)
  } catch (error) {
    console.warn(error)
  }
  return rendererCodespan(text)
}

/**
 * 表格
 * @param {*} header
 * @param {*} body
 * @returns
 */
renderer.table = function(header, body) {
  if (body) body = `<tbody>${body}</tbody>`
  return `<div class="table-wrap">\n<table>\n<thead>\n${header}</thead>\n${body}</table>\n</div>\n`
}
/*
renderer.image = function (href, title, text) { 
  console.log();
  return `<div colorify-container><img src="${href}" alt="${text}" colorify /></div>`
}*/

/**
 * 标题
 * @param {*} text
 * @param {*} level
 * @param {*} raw
 * @param {*} slugger
 * @returns
 */
renderer.heading = function(text, level, raw, slugger) {
  const id = slugger.slug('md-title')
  titles.push({ id, level, title: raw })
  return `<h${level} id="${id}">\n${raw}\n</h${level}>\n`
}
/**
 * 数学表达式解析
 * @param {*} expr
 * @returns
 */
function mathsExpression(expr) {
  if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
    expr = expr.substr(2, expr.length - 4)
    return katex.renderToString(expr, { displayMode: true })
  } else if (expr.match(/^\$[\s\S]*\$$/)) {
    expr = expr.substr(1, expr.length - 2)
    return katex.renderToString(expr, { displayMode: false })
  }
}

marked.setOptions({
  renderer,
  highlight: code => hljs.default.highlightAuto(code).value,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})
/**
 * 重置状态
 */
function reset() {
  titles = []
  codeBlockId = 0
}
/**
 * 解析 Markdown 到 HTML
 * @param {*} markdown
 * @returns
 */
function markdown(markdown) {
  if (!markdown) return
  try {
    reset()
    return { html: DOMPurify.sanitize(marked(markdown)), titles }
  } catch (e) {
    console.error(e)
  }
}
/**
 * 属性注入
 */
export default ({ app }, inject) => {
  inject('markdown', md => markdown(md))
}
