<template lang="pug">
.pagination-wrap
  .pagination
    .pagination-first(:class="{ disable: current === 1 }", @click="onClick(1)")
      i.material-icons first_page
    .pagination-pre(
      :class="{ disable: current === 1 }",
      @click="onClick(current - 1)"
    )
      i.material-icons navigate_before
    .pagination-page(
      v-for="n in range",
      :key="n",
      :class="{ active: n === current }",
      @click="n === current ? null : onClick(n)"
    ) {{ n }}
    .pagination-next(
      :class="{ disable: current === size }",
      @click="onClick(current + 1)"
    )
      i.material-icons navigate_next
    .pagination-last(
      :class="{ disable: current === size }",
      @click="onClick(size)"
    )
      i.material-icons last_page
  .pagination-loading(v-show="loading")
</template>

<script>
export default {
  model: {
    prop: 'current',
    event: 'change'
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    maxCount: 5
  }),
  computed: {
    range() {
      const r = parseInt(this.maxCount / 2)
      if (this.current <= r) {
        return this.getRange(1, this.maxCount)
      } else if (this.current + r > this.size) {
        return this.getRange(this.size - this.maxCount + 1, this.size)
      } else {
        return this.getRange(this.current - r + (this.maxCount % 2 ? 0 : 1), this.current + r)
      }
    }
  },
  methods: {
    onClick(n) {
      this.$emit('change', n)
    },
    getRange(start, end) {
      const arr = []
      if (start == null) return arr
      if (!end) {
        end = start
        start = 0
      }
      for (let index = start; index <= end; index++) {
        arr.push(index)
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
