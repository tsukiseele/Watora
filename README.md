## Watora

一个ACG风格的单页面无后端博客，使用服务器端渲染进行SEO优化
### 介绍
本来想用SSM做后端的，不过发现这样弄下来工作量略大（懒），于是参考了蝉时雨大佬的车万博客，顿时有了想法，于是Watora就应运而生了
### 依赖
- `nuxt.js` - 服务器端渲染
- `vssue` - 以Github Issues作为评论系统
- `marked.js` - Markdown支持
- `highlight.js` - 代码高亮
- `@moefe/vue-aplayer` - 网页播放器
- `live2d-vue` - Live2d看板娘
### 常见问题
- 如何关闭SSR，部署为静态页面
  >将 `nuxt.config.js` 中的 `ssr: true` 改为 `ssr: false`

###  

### 安装与搭建
#### 部署在Glitch（无需服务器及域名）
由于是服务器端渲染，我们需要将项目部署到Node环境中，
我们可以使用[Glitch](https://glitch.com/)进行部署。
缺点是页面长时间无人范围会进入休眠

#### 部署在Github Pages （无需服务器及域名，无SSR）
[Github Pages](https://pages.github.com/)

#### 部署在云服务器（需要服务器及域名）
```zsh
# 安装Node
```

```zsh
# 安装依赖
# install dependencies
$ yarn install

# 以开发环境启动热重载服务
# serve with hot reload at localhost:80
$ yarn dev

# 构建到生产环境以及启动服务
# build for production and launch server
$ yarn build
$ yarn start
```
