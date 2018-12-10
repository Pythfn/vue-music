<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.initBScroll()
      console.log('bscroll')
    }, 20)
  },
  methods: {
    initBScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType
      })
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    }
  }
}

</script>
<style lang="stylus" scoped>
</style>
