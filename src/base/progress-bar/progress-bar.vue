<template>
  <div class="progress-bar">
    <div
     class="bar"
     ref="bar"
     @click="moveProgress"
    >
      <div
       class="light"
       ref="light"
      >
        <div
         class="ball"
         ref="ball"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    progressNum: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ...mapGetters([
      'playing',
      'playList'
    ])
  },
  methods: {
    moveProgress(e) {
      let p = e.offsetX / this.barWidth
      this.$emit('moveprogress', p)
    }
  },
  watch: {
    playList() {
      //  改变dom会导致状态栏失效
      if (!this.barWidth) {
        this.barWidth = this.$refs.bar.clientWidth
        console.log('进度栏' + this.barWidth)
      }
    },
    progressNum(newNum) {
      let lightWidth = newNum / 100 * this.barWidth
      this.$refs.light.style.width = `${lightWidth}px`
      this.$refs.ball.style['transform'] = `translate3d(${lightWidth}px,0,0)`
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.progress-bar
  margin-top:6px
  margin-left:6px
  .bar
    background:red
    width:100%
    border-radius:5px
    .light
      position:relative
      background:$color-theme
      width:0
      height:5px
      .ball
        position: relative
        box-sizing: border-box
        top:-5px
        left:-10px
        width:15px
        height:15px
        border-radius:50%
        background:$color-theme
</style>