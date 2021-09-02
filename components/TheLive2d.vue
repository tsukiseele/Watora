<template lang="pug">
client-only
  .live2d
    .live2d-panel
      dialogue.dialogue-live2d(
        v-show='isDialogue'
        :customDialogue='customDialogue'
        ref='dialogue')

      live2d(
        v-if='isLive2d'
        :height='height'
        :width='width'
        :modelPath='modelPath'
        ref= 'l2dMange')

    .tools-panel(:class="{ show: !isLive2d }")
      live2d-tools(
        :hidden="!isLive2d",
        :btns="tools.btns",
        :options="tools.options",
        @home="home()",
        @change="change()",
        @save="save()",
        @about="about()",
        @hide="hide()"
      )
</template>

<script>
import custom from "~/assets/data/custom.json";
import Live2dTools from "~/components/TheLive2dTools";

export default {
  components: {
    Live2dTools,
  },
  data: () => ({
    // 模型资源
    models: [
      {
        src:
          "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api@1.0.0/model/HyperdimensionNeptunia/nepgearswim/index.json",
      },
      {
        src:
          "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api@1.0.0/model/HyperdimensionNeptunia/nepswim/index.json",
      },
    ],
    modelIndex: 0,

    // 对话框文本
    customDialogue: custom,

    // 模型宽高
    width: 200,
    height: 200,
    tools: {
      btns: [
        {
          icon: "home",
          on: "home",
        },
        {
          icon: "change_circle",
          on: "change",
        },
        {
          icon: "photo_camera",
          on: "save",
        },
        {
          icon: "info",
          on: "about",
        },
      ],
      options: {
        icon: {
          hidden: "visibility_off",
          show: "visibility",
        },
        on: "hide",
      },
    },
    // 显示Live2D
    isLive2d: true,
    // 显示对话框
    isDialogue: true,
    //
    message: "",
  }),
  computed: {
    modelPath() {
      return this.models[this.modelIndex].src;
    },
  },
  watch: {
    message(newVal, oldVal) {
      this.$refs.dialogue.showMessage(newVal, 10000);
    },
  },
  mounted() {
    setInterval(async () => {
      if (this.isDialogue) {
        const { data } = await this.$axios.get(
          "https://v1.hitokoto.cn/?encode=json"
        );
        if (this.$refs.dialogue) {
          this.showMessage(data.hitokoto);
        }
      }
    }, 30000);
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    change() {
      this.modelIndex =
        this.modelIndex + 1 < this.models.length ? this.modelIndex + 1 : 0;
    },
    save() {
      this.$refs.l2dMange.save(`live2d-${Date.now()}.png`);
    },
    about() {
      window.open("https://github.com/LingHanChuJian/live2d-vue", "_blank");
    },
    hide() {
      this.isLive2d = this.isDialogue = !this.isLive2d;
    },
    showMessage(message) {
      this.message = message;
    },
  },
};
</script>

<style lang="scss" scoped>
.live2d {
  position: relative;
  z-index: 1;
}

.tools-panel {
  position: fixed;
  right: -32px;
  bottom: 0px;
  max-width: 32px;
  transition: 0.3s ease;
  cursor: pointer;
  opacity: 0;
}

.live2d:hover .tools-panel {
  right: 10px;
  opacity: 1;
}

.show {
  right: 10px;
  opacity: 1;
}

.live2d-panel {
  position: fixed;
  right: 0;
  width: 200px;
  bottom: -8px;
}
</style>

<style lang="scss">
.live2d .dialogue-live2d {
  color: var(--text) !important;
  background: var(--card-alpha) !important;
  border: var(--border) !important;
  box-shadow: 0 3px 9px var(--shadow) !important;
  border-radius: 8px !important;
  width: 192px !important;
  margin-left: 0 !important;
}
</style>
