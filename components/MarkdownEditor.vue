<template lang="pug">
mavon-editor(ref="md", v-model="form.articleContent")
</template>

<script>
export default {
  data: () => ({
    loading: false,
    upload: {
      cover: null,
    },
    form: {
      articleTitle: "",
      articleSubtitle: "",
      articleContent: "",
      articleCover: "",
    },
  }),
  methods: {
    /**
     * 图片上传到Github，并使用CDN提升加载速度
     * 服务端只存储图像信息
     */
    async uploadImage() {
      this.loading = true;
      // 验证文件类型
      const img = this.upload.cover;
      if (!/image\/\w+/.test(img.type) || !img) {
        alert("请确保文件为图像类型");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(img);
      reader.addEventListener("load", async () => {
        const base64Data = reader.result.replace(/.*,/, "");
        const md5 = this.$md5(base64Data);
        const fileName = `${md5}.${img.type.replace(/.*\//, "")}`;
        // 创建Json对象
        const data = {
          committer: {
            name: "tsukiseele",
            email: "tsukiseele@hotmail.com",
          },
          message: `upload image ${fileName}`,
          // 图片编码为纯Base64
          content: base64Data,
        };
        // 开始上传
        try {
          // 验证文件是否存在
          const _img = await this.$api.getImageByHash(md5);
          if (_img.imgSrc) {
            this.form.articleCover = _img.imgSrc;
            this.loading = false;
            return;
          }
          // 上传图片到Github仓库
          const result = await this.$axios.put(
            `https://api.github.com/repos/tsukiseele/ImageHosting/contents/upload/${fileName}?access_token=20f0e5170437a8a558df1de33fc6f8e0a52b4e0d`,
            data
          );
          // 判断是否上传成功，返回422代表图片已存在无需上传
          if (/2\d\d/.test(result.status) || result.status === 422) {
            // 修改仓库原始url为CDN url，更新url到表单
            this.form.articleCover = result.data.content.download_url
              .replace("raw.githubusercontent.com", "cdn.jsdelivr.net/gh")
              .replace("master/", "");
            // 提交图片信息到服务器
            const state = await this.$api.addImage({
              imgSrc: this.form.articleCover,
              imgHash: md5,
            });
          } else {
            alert("上传图片失败");
          }
        } catch (e) {
          alert(`上传图片失败：${e}`);
        } finally {
          this.loading = false;
        }
      });
    },
    async onSubmit() {
      this.form.articleDate = new Date();
      console.log(this.form);

      const result = await this.$api.addArticle(this.form);

      if (result) {
        if (confirm("提交成功，是否跳转查看")) {
          this.$router.push(`/post/1`);
        }
        // this.showToast("提示", "提交成功", "success");
      } else {
        alert("提交失败");
        // this.showToast("警告", "提交失败", "danger");
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>