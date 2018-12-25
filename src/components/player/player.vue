<template>
  <div class="player" v-show="playList.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="back" @click.prevent="minimizePlay">
        <i class="icon-back"></i>
      </div>
      <div class="player-title">
        <div class="songName">{{ currentSong.name }}</div>
        <div class="singerName">{{ currentSong.singer }}</div>
        <div class="songIndex">{{ currentIndex + 1 }} / {{ playList.length }}</div>
      </div>
      <div class="songAlbum">
        <img :src="currentSong.image" class="songAlbumImg">
      </div>
      <div class="player-panel">
        <div class="icon i-1">
          <i>1</i>
        </div>
        <div class="icon i-2" @click="prevPlay">
          <i class="icon-prev"></i>
        </div>
        <div class="icon i-3" @click="togglePlay">
          <i :class="iconTogglePlay"></i>
        </div>
        <div class="icon i-4" @click="nextPlay">
          <i class="icon-next"></i>
        </div>
        <div class="icon i-5">5</div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen">
      <div class="songName">{{ currentSong.name }}</div>
      <div class="singerName">{{ currentSong.singer }}</div>
    </div>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    iconTogglePlay() {
      return !this.playing ? 'icon-play' : 'icon-pause'
    },
    ...mapGetters([
      'playing',
      'playList',
      'fullScreen',
      'currentIndex',
      'currentSong'
    ])
  },
  methods: {
    minimizePlay() {
      this.setFullScreen(false)
    },
    togglePlay() {
      if (this.playing) {
        this.setPlaying(false)
      } else {
        this.setPlaying(true)
      }
      console.log(this.playing)
    },
    prevPlay() {
      if (this.currentIndex === 0) {
        this.setCurrentIndex(this.playList.length - 1)
      } else {
        this.setCurrentIndex(this.currentIndex - 1)
      }
    },
    nextPlay() {
      if (this.currentIndex === this.playList.length - 1) {
        this.setCurrentIndex(0)
      } else {
        this.setCurrentIndex(this.currentIndex + 1)
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (newPlaying) {
          audio.play()
        } else {
          audio.pause()
        }
      })
    },
    currentSong(newSong) {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.player
  .normal-player
    position:fixed
    bottom:0
    left:0
    right:0
    top:0
    background: $color-background
    .back
      position:fixed
      padding:10px
    .player-title
      text-align: center
      margin:0 auto
      padding-top:10px
      .songName
        color:$color-text
        font-size:$font-size-large
      .singerName
        color:$color-text-l
        font-size:$font-size-medium
        margin-top:5px
      .songIndex
        font-size:$font-size-medium
        margin-top:5px
    .player-panel
      display:flex
      position:fixed
      justify-content:center
      align-items:center
      width:100%
      bottom:60px
      .icon
        padding:20px
        font-size:30px
        color:$color-theme
      .i-3
        font-size:45px
    .songAlbum
      margin:0 auto
      text-align: center
      margin-top:60px
      .songAlbumImg
        border-radius:50%
  .mini-player
    position:fixed
    bottom:0
    left:0
    right:0
    height:80px
    background: $color-background
</style>