export default ({ app, $axios }, inject) => {
  $axios.defaults.headers.common[
    "Authorization"
  ] = "ghp+M39JbvqRn3ipsl8OOZfRFhLPDjR8uO0j7sLs".replace("+", " ");
  inject("api", {
    // 登录
    async login(params) {
      return await $axios.$post(`/api/login`, params);
    },
    async auth() {
      return await $axios.$post(`/api/auth`);
    },
    // 文章
    async getArticleCount() {
      return await $axios.$get(`/api/article/count`);
    },
    async getArticlePage(page, count) {
      return await $axios.$get(`/api/article?page=${page}&count=${count}`);
    },
    async getAllArticles() {
      return await $axios.$get(`/api/article/all`);
    },
    async addArticle(article) {
      return await $axios.$post(`/api/article`, article);
    },
    async getArticleById(id) {
      return await $axios.$get(`/api/article/${id}`);
    },
    // async getArchives() {
    //   return await $axios.$get(`/api/article/archives`);
    // },
    // 评论
    async getCommentTree(articleId) {
      return await $axios.$get(`/api/comment/tree/${articleId}`);
    },
    async addComment(comment) {
      return await $axios.$put(`/api/comment`, comment);
    },
    // 访客
    async addVisitor(visitor) {
      return await $axios.$put(`/api/visitor`, visitor);
    },
    // 链接
    async getAllLink() {
      return await $axios.$get(`/api/link`);
    },
    async addLink(link) {
      return await $axios.$put(`/api/link`, link);
    },
    // 图片
    async getImageByHash(hash) {
      return await $axios.$get(`/api/image/hash/${hash}`);
    },
    async getAllImage() {
      return await $axios.$get(`/api/image`);
    },
    async getImageOfRange(index, count) {
      return await $axios.$get(`/api/image?index=${index}&count=${count}`);
    },
    async addImage(image) {
      return await $axios.$put(`/api/image`, image);
    },
    async uploadImage(file) {
      let formData = new FormData();
      formData.append("image", file);
      return await $axios.$post(`/api/upload/image`, formData, {
        header: { "Content-Type": "multipart/form-data" }
      });
    }
  });
};
