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
     :style="singerBgImg"
    >
      <div
       class="playAllSongs"
       v-show="data.length"
       ref="playAllSongs"
      >
        <div class="playBtn">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div
       class="singerBgTrans"
       ref="singerBgTrans"
      ></div>
    </div>
    <div
     class="scrollBg"
     ref="scrollBg"
    ></div>
    <scroll
     class="songScroll"
     :data="songList"
     :probetype="probetype"
     :listenScroll="listenScroll"
     @scroll="scroll"
     ref="songScroll"
    >
      <div class="songList">
        <song-list :songs="songList" @select="selectSong"></song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
import SongList from 'base/song-list/song-list'
import { mapActions } from 'vuex'
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
  computed: {
    singerBgImg() {
      return `background-image:url(${this.singerBg})`
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
    },
    selectSong(item, index) {
      this.startPlay({
        data: this.songList,
        index
      })
      console.log(this.$store.state.playing)
    },
    ...mapActions([
      'startPlay'
    ])
  },
  created() {
    this.probetype = 3
    this.listenScroll = true
  },
  mounted() {
    this.singerBgHeight = this.$refs.singerBg.clientHeight
    this.minScrollHeight = this.singerBgHeight - SINGER_TITLE_HEIGHT
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
      //  负数，返回最大的负数
      //  this.scrollHeight = Math.max(this.minScrollHeight, newY)
      //  this.thescrollHeight = this.singerBgHeight+this.scrollHeight
      //  this.$refs.songScroll.$el.style.top = `${this.thescrollHeight}px`
      if (this.minScrollHeight - Math.abs(newY) > 0) {
        this.$refs.scrollBg.style['transform'] = `translate3d(0, ${newY}px, 0)`
        this.$refs.scrollBg.style['-webkit-transform'] = `translate3d(0, ${newY}px, 0)`
        //  标题需要遮住列表的滚动
        this.$refs.singerBg.style.zIndex = 0
        this.$refs.singerBg.style.paddingBottom = '70%'
        this.$refs.singerBgTrans.style.paddingBottom = '70%'
        this.$refs.playAllSongs.style.display = ''
      } else {
        this.$refs.scrollBg.style['transform'] = `translate3d(0,${-this.minScrollHeight}px, 0)`
        this.$refs.scrollBg.style['-webkit-transform'] = `translate3d(0,${-this.minScrollHeight}px, 0)`
        this.$refs.singerBg.style.zIndex = 20
        this.$refs.singerBg.style.paddingBottom = `${SINGER_TITLE_HEIGHT}px`
        this.$refs.singerBgTrans.style.paddingBottom = `${SINGER_TITLE_HEIGHT}px`
        this.$refs.playAllSongs.style.display = 'none'
      }
      //  下拉标题图缩放，使用transform的scale 2d缩放
      let scaleNum = 1 + newY / 150
      if (newY > 0) {
        this.$refs.singerBg.style['transform'] = `scale(${scaleNum})`
      } else {
        this.$refs.singerBg.style['transform'] = `scale(1)`
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer-detail
  //  必须使用fixed，使用absolute会出现滚动条
  position: fixed
  top: 0
  bottom: 0
  left:0
  right:0
  background: $color-background
  .singer-title
    position:absolute
    top:0
    left:0
    right:0
    z-index: 50
    .back
      position:absolute
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
    position: relative
    width:100%
    height:0
    padding-bottom:70%
    background-size: cover
    overflow:hidden
    .singerBgTrans
      background: rgba(7, 17, 27, 0.4)
      width:100%
      height:0
      padding-bottom:70%
    .playAllSongs
      position:absolute
      bottom:15px
      width:100%
      .playBtn
        border:1px solid $color-theme
        padding:10px
        border-radius: 15px
        width:110px
        margin:0 auto
        color: $color-theme
        font-size:12px
        text-align:center
  .scrollBg
    background:$color-background
    height:100%
  .songScroll
    position: fixed
    top:0
    left:0
    right:0
    bottom:0
</style>