<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots" v-if="dotsList.length">
      <span class="dot" :class="{dotActive : pageIndex === index}" v-for="(item, index) in dotsList" :key="index" >
      </span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dotsList: [],
      pageIndex: 0,
      timer: null,
      slider: null,
      children: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      if (this.autoPlay) {
        this.play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      clearTimeout(this.timer)
      if (this.slider) {
        this.setSliderWidth(true)
        this.slider.refresh()
      }
      if (this.autoPlay) {
        this.play()
      }
    })
  },
  destoryed() {
    clearTimeout(this.timer)
  },
  methods: {
    setSliderWidth(resize) {
      // 获取slider滚动的元素
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      this.children = this.$refs.sliderGroup.children
      for (let i = 0; i < this.children.length; i++) {
        let citem = this.children[i]
        addClass(citem, 'slider-item')
        citem.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !resize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click: true,
        // better-scroll 1.0后使用slider的新配置方法
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      // better-scroll滚动完毕会广播scrollEnd事件
      this.slider.on('scrollEnd', () => {
        clearTimeout(this.timer)
        this.pageIndex = this.slider.getCurrentPage().pageX
        if (this.autoPlay) {
          this.play()
        }
      })
    },
    initDots() {
      this.dotsList = new Array(this.children.length)
    },
    play() {
      this.timer = setTimeout(() => {
        // this.slider.goToPage(toPage, 0, 400)
        // 新版better-scroll封装的next()方法，无需使用gotopage
        this.slider.next()
      }, this.interval)
    }
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
    .slider-item
      width:100%
      float:left
      overflow:hidden
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
    .dots
      position: absolute
      left:0
      bottom:3px
      right:0
      text-align:center
      .dot
        display:inline-block
        background: white
        width: 6px
        height: 6px
        margin:0 4px
        border-radius:50%
       .dotActive
          width: 12px
          border-radius:30%
</style>
