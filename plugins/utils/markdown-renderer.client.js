// see https://marked.js.org/using_pro#renderer
import marked from 'marked'
import DOMPurify from 'dompurify'
/*
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/stackoverflow-dark.css";
import "highlight.js/styles/night-owl.css";
*/

let CODE_ID = 0
const CODE_COPY_LIST = []

const hljs = require('@/plugins/utils/highlight.js')
const renderer = new marked.Renderer()

renderer.code = function code(_code, infostring, escaped) {
  CODE_ID++
  const id = `code-${CODE_ID}`
  CODE_COPY_LIST.push({ id, code: _code })
  const lang = (infostring || '').match(/\S*/)[0]
  if (this.options.highlight) {
    const out = this.options.highlight(_code, lang)
    if (out != null && out !== _code) {
      escaped = true
      _code = out
    }
  }
  const langClass = this.options.langPrefix + lang
  return `
    <pre class="hljs${lang ? ` ${langClass}` : ''}">
      <code class="${lang ? `${langClass}` : ''}">${_code}</code>
      <div class="code-options">
        <i id="${id}" class="material-icons">content_paste</i>
      </div>
    </pre>\n`
}

renderer.table = function(header, body) {
  if (body) body = `<tbody>${body}</tbody>`
  return `<div class="table-wrap">\n<table>\n<thead>\n${header}</thead>\n${body}</table>\n</div>\n`
}
renderer.heading = function(text, level, raw, slugger) {
  return `<h${level} id="${slugger.slug('md-title')}">\n${raw}\n</h${level}>\n`
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
  xhtml: false
})

export default ({ app }, inject) => {
  inject('markdown', function(markdown) {
    try {
      return DOMPurify.sanitize(marked(markdown))
    } catch (e) {
      console.log(e)
    }
  })
}
