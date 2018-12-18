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
    probetype: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.initBScroll()
      console.log('bscroll start')
    }, 20)
  },
  methods: {
    initBScroll() {
      if (this.$refs.wrapper) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probetype
        })
      }
      if (this.listenScroll) {
        const self = this
        this.scroll.on('scroll', (p) => {
          self.$emit('scroll', p)
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log('bscroll refresh')
    },
    scrollToElement (e, time, offsetX, offsetY, easing) {
      this.scroll && this.scroll.scrollToElement(e, time, offsetX, offsetY, easing)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}

</script>
<style lang="stylus" scoped>
</style>
