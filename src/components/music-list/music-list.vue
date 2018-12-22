<template>
  <div class="singer-detail">
    <div class="singer-title">
      <div
       class="back"
       @click="goback"
      >
        <i class="icon-back"></i>
      </div>
      <div class="singerName">{{ title }}</div>
    </div>
    <div
     class="singerBg"
     ref="singerBg"
    >
      <img :src="singerBg" class="singerBgimg">
    </div>
      <scroll
       class="songScroll"
       :data="songList"
       :probetype="probetype"
       :listenScroll="listenScroll"
       @scroll="scroll"
       ref="songScroll"
      >
        <div>
          <song-list :songs="songList"></song-list>
        </div>
      </scroll>
    </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'

const SINGER_TITLE_HEIGHT = 40
export default {
  props: {
    data: {
      type: Array
    },
    songList: {
      type: Array
    },
    title: {
      type: String,
      default: ''
    },
    singerBg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: ''
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    scroll(p) {
      this.scrollY = p.y
    }
  },
  created() {
    this.probetype = 3
    this.listenScroll = true
  },
  mounted() {
    this.singerBgHeight = this.$refs.singerBg.clientHeight
    this.minScrollHeight = - this.singerBgHeight + SINGER_TITLE_HEIGHT
    this.$refs.songScroll.$el.style.top = `${this.singerBgHeight}px`
    window.addEventListener('resize', () => {
      this.singerBgHeight = this.$refs.singerBg.clientHeight
      this.$refs.songScroll.$el.style.top = `${this.singerBgHeight}px`
    })
  },
  components: {
    SongList,
    Scroll
  },
  watch: {
    scrollY(newY) {
      //负数，返回最大的负数
      this.scrollHeight = Math.max(this.minScrollHeight, newY)
      this.thescrollHeight = this.singerBgHeight+this.scrollHeight
      this.$refs.songScroll.$el.style.top = `${this.thescrollHeight}px`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer-detail
  position: absolute
  top: 0
  bottom: 0
  left:0
  right:0
  background: $color-background
  z-index: 99
  .singer-title
    position:absolute
    top:0
    left:0
    right:0
    .back
      position:absolute
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .singerName
      position:absolute
      top:6px
      left:0
      right:0
      bottom:0
      text-align: center
      font-size:18px
      margin-top:5px
  .singerBg
    width:100%
    height:0
    padding-bottom:70%
    overflow:hidden
    .singerBgimg
      width:100%
  .songScroll
    position:absolute
    top:0
    left:0
    right:0
    bottom:0
    overflow:hidden

</style>