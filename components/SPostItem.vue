<template lang="pug">
.post-item(@click="$router.push(to)")
  .item-cover-box
    img.item-cover(v-lazy="cover.src || placeholder")
  .item-info 
    .item-title {{ title }}
    span.item-preview {{ description }}
    ul.item-labels
      li.item-label
        SChip(:text="date | formatTimeAgo", icon="event_note")
      li.item-label(v-for="(label, i) in labels", :key="i")
        SChip(:text="label.name", icon="sell")
  .item-category 
    i.category-icon.material-icons bookmark
    span.category-text {{ category || '未分类' }}
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    cover: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: String,
      default: null,
    },
    labels: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: null,
    },
    category: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-item {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 0.5rem;
  background: var(--card);
  transition: all 0.3s;
  box-shadow: var(--shadow);
  cursor: pointer;
  border-radius: 5px;
  backdrop-filter: blur(10px);

  &:hover {
    background: var(--card-active);
    .item-cover {
      filter: brightness(0.8);
      transform: none;
    }
  }
  .item-cover-box {
    flex: 0 0 250px;
    height: 200px;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .item-cover {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transform: scale(1.2);
    transition: all 0.6s;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    color: var(--text);
    padding: 0 0 0 1rem;
    .item-title {
      font-size: 1.4rem;
      font-weight: normal;
      color: var(--text);
      transition: color 0.3s;
      &:hover {
        color: var(--text-primary);
      }
    }
    .item-preview {
      flex: 1;
      color: var(--text-secondary);
      word-break: break-word;
      white-space: normal;
      text-overflow: ellipsis;
    }
    .item-icon {
      padding-right: 0.33rem;
    }
    .item-labels {
      list-style: none;
      .item-label {
        display: inline-block;
        margin-right: 0.5rem;
      }
    }
  }
  .item-category {
    $triangle: 0.8rem;
    $height: 2rem;
    position: absolute;
    text-align: center;
    color: var(--theme-primary);
    background: currentColor;
    width: 6.6rem;
    font-size: 0.8rem;
    line-height: $height;
    padding: 0 0.5rem 0 0.5rem;
    border-radius: 0 3px 3px 0;
    top: 1rem;
    left: -$triangle;
    box-shadow: var(--shadow);
    &::before {
      content: "";
      position: absolute;
      border: $triangle solid;
      border-right-width: 0;
      border-color: currentColor transparent transparent;
      rotate: 45deg;
      height: 0;
      width: 0;
      top: 100%;
      left: 0;
      filter: brightness(120%);
    }
    .category-icon {
      display: inline-block;
      color: var(--text);
      font-size: 1.2rem;
      vertical-align: middle;
      margin: 0 0.5rem 0 -0.5rem;
    }
    .category-text {
      color: var(--text);
      margin: 0rem;
      font-size: 0.8rem;
      vertical-align: middle;
    }
  }
  /** Mobile兼容 */
  @media screen and (max-width: $mobile) {
    /* A方案-下方显示*/
    flex-direction: column;
    padding: 0rem;
    .item-cover-box {
      width: 100%;
      flex: 0 0 220px;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
    }

    .item-info {
      padding: 0.5rem 1rem 0.5rem 1rem;
    }

    .item-category {
      line-height: 2.2rem;
    }
    /* B方案-遮罩层显示*/
    /*
    flex-direction: column;
    padding: 0rem;
    height: 250px;
    background: none;
    justify-content: flex-end;
    overflow: hidden;
    .item-info {
      flex: 0;
      background-color: var(--bg);
      justify-content: flex-end;
      .item-preview {
        flex: 0;
      }
    }
    .item-type {
      display: none;
    }
    .item-cover-box {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      height: 300px;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      filter: brightness(0.8);
    }
    .item-info {
      padding: 0 0.5rem 0.5rem 0.5rem;
    }
    .item-type {
      line-height: 2.2rem;
    }*/
  }
}
</style>
