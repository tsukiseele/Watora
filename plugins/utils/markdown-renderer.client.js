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

const TITLES = []
let CODE_ID = 0
const rendererCodespan = renderer.codespan
renderer.codespan = function(text) {
  try {
    return mathsExpression(text) || rendererCodespan(text)
  } catch (error) {
    console.warn(error)
  }
  return rendererCodespan(text)
}

renderer.code = function(_code, _lang, isEscaped) {
  if (_lang && _lang.toLocaleLowerCase() == 'math') {
    try {
      const math = katex.renderToString(_code, { displayMode: true })
      if (math) return math
    } catch (error) {
      console.warn(error)
    }
  }

  CODE_ID++
  const id = `code-${CODE_ID}`
  const lang = (_lang || '').match(/\S*/)[0]
  if (this.options.highlight) {
    const lighlightCode = this.options.highlight(_code, lang)
    if (lighlightCode) _code = lighlightCode
  }
  const langClass = this.options.langPrefix + lang
  return `
    <pre class="hljs${lang ? ` ${langClass}` : ''}"><div class="code-options">
      <i data-copy="${id}" class="material-icons md-code-copy">content_paste</i>
      </div><div class="code-wrap"><code class="${lang ? ` ${langClass}` : ''}" id="${id}">${_code}</code></div>
    </pre>\n`
}

renderer.table = function(header, body) {
  if (body) body = `<tbody>${body}</tbody>`
  return `<div class="table-wrap">\n<table>\n<thead>\n${header}</thead>\n${body}</table>\n</div>\n`
}

renderer.heading = function(text, level, raw, slugger) {
  const id = slugger.slug('md-title')
  TITLES.push({ id, level, title: raw })
  return `<h${level} id="${id}">\n${raw}\n</h${level}>\n`
}

function mathsExpression(expr) {
  if (expr.match(/^\$\$[\s\S]*\$\$$/)) {
    expr = expr.substr(2, expr.length - 4)
    console.log(expr)
    return katex.renderToString(expr, { displayMode: true })
  } else if (expr.match(/^\$[\s\S]*\$$/)) {
    expr = expr.substr(1, expr.length - 2)
    console.log(expr)
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

export default ({ app }, inject) => {
  inject('markdown', function(markdown) {
    try {
      const html = DOMPurify.sanitize(marked(markdown))
      const titles = [...TITLES]
      TITLES.splice(0, TITLES.length)
      return { html: html, titles }
    } catch (e) {
      console.log(e)
    }
  })
}
