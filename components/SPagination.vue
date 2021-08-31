<template lang="pug">
.pagination-wrap
  .pagination
    .pagination-first(:class="{ disable: current === 1 }", @click="onClick(1)")
      SvgIcon(type="mdi", :path="icons.mdiPageFirst")
    .pagination-pre(:class="{ disable: current === 1 }", @click="onClick(current - 1)")
      SvgIcon(type="mdi", :path="icons.mdiChevronLeft")
    .pagination-page(
      v-for="n in range",
      :key="n",
      :class="{ active: n === current }",
      @click="onClick(n)"
    ) {{ n }}
    .pagination-next(:class="{ disable: current === size }" @click="onClick(current + 1)")
      SvgIcon(type="mdi", :path="icons.mdiChevronRight")
    .pagination-last(:class="{ disable: current === size }" @click="onClick(size)")
      SvgIcon(type="mdi", :path="icons.mdiPageLast")
  .pagination-loading(v-show="loading")
</template>

<script>
import {
  mdiPageFirst,
  mdiPageLast,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
export default {
  model: {
    prop: "current",
    event: "change",
  },
  props: {
    current: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    maxCount: 5,
    icons: {
      mdiPageFirst,
      mdiPageLast,
      mdiChevronLeft,
      mdiChevronRight,
    },
  }),
  computed: {
    range() {
      const r = parseInt(this.maxCount / 2);
      if (this.current <= r) {
        return this.getRange(1, this.maxCount);
      } else if (this.current + r > this.size) {
        return this.getRange(this.size - this.maxCount + 1, this.size);
      } else {
        console.log(this.current - r, this.current + r);
        return this.getRange(
          this.current - r + (this.maxCount % 2 ? 0 : 1),
          this.current + r
        );
      }
    },
  },
  methods: {
    onClick(n) {
      this.$emit("change", n);
    },
    getRange(start, end) {
      const arr = [];
      if (start == null) return arr;
      if (!end) {
        end = start;
        start = 0;
      }
      for (let index = start; index <= end; index++) {
        arr.push(index);
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-wrap {
  position: relative;
}
.pagination-loading {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.33);
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
  }
  &::after {
    background: skyblue;
    animation: identifier 2s linear infinite;
  }
  &::before {
    background: pink;
    animation: identifier 2s linear -1s infinite;
  }
  @keyframes identifier {
    0% {
      transform: translateX(2rem);
    }
    25% {
      transform: translateX(0) scale(1.2);
      z-index: 2;
    }
    50% {
      transform: translateX(-2rem);
    }
    75% {
      transform: translateX(0) scale(1.2);
      z-index: 1;
    }
    100% {
      transform: translateX(2rem);
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin: 1rem;

  .pagination-first,
  .pagination-pre,
  .pagination-page,
  .pagination-next,
  .pagination-last {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
    background-color: white;
    margin: 0.3rem;
    border-radius: 4px;
    box-shadow: var(--shadow);

    &:hover {
    }
  }
  .active {
    outline: 3px inset hotpink;
  }
  .disable {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
}
</style>