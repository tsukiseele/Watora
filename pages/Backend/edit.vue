<template lang="pug">
#container 
  .card 
    form#form
      span 标题
      input(type="text", name="title", v-model="form.articleTitle")
      span 概述
      input(type="text", name="subtitle", v-model="form.articleSubtitle")
      span 封面
      img.preview(:src="getObjectURL")
      input(type="file", @change="uploadImage()", ref="coverInput")
      mavon-editor(ref="md", v-model="form.articleContent")
      input(:disable="loading", type="button", @click="onSubmit()", value="提交")
  Dialog(:title="dialog.title", :text="dialog.text", :show="dialog.show")
</template>

<script>
export default {
  layout: "backend",
  data: () => ({
    loading: false,
    preview: null,
    form: {
      articleTitle: "",
      articleSubtitle: "",
      articleContent: "",
      articleCover: "",
    },
    dialog: {
      title: "",
      text: "",
      show: false,
    },
  }),
  methods: {
    /**
     * 图片上传到Github，并使用CDN提升加载速度
     * 服务端只存储图像信息
     */
    async uploadImage(e) {
      // 设置加载标志
      this.loading = true;
      // 获取图片
      const img = this.$refs.coverInput.files[0];
      this.preview = img;
      if (!img) return;
      // 验证文件类型
      if (!/image\/\w+/.test(img.type)) {
        alert("无法识别该图片！");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(img);
      reader.addEventListener("load", async () => {
        // 截取 Base64 数据
        const base64Data = reader.result.replace(/.*,/, "");
        // 计算MD5
        const md5 = this.$md5(base64Data);
        // 拼接文件名
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
      if (this.form.articleTitle && this.form.articleContent) {
        //
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
      } else {
        this.dialog.show = true;
        this.dialog.title = "测试";
        this.dialog.text = "tttttttttttt";
        // alert("标题和内容不可为空！");
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    getObjectURL() {
      if (this.preview) {
        var url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(this.preview);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(this.preview);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(this.preview);
        }
      }
      return url;
    },
  },
};
</script>

<style lang="scss" scoped>
#form {
  display: flex;
  flex-direction: column;
}
.preview {
  max-width: 50%;
  align-self: center;
}
.disable {
}
</style>