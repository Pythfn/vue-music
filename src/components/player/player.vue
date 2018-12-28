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
      <div class="progress-panel">
        <div class="timeLeft">
          {{ currentAudioTimeX }}
        </div>
        <div class="progress">
          <progress-bar :progressNum="progressNum" @moveprogress="onMoveProgress"></progress-bar>
        </div>
        <div class="timeRight">
           {{ currentAudioDurationX }}
        </div>
      </div>
      <div class="player-panel">
        <div class="icon i-1" @click="changePlayMode">
          <i :class="iconPlayMode"></i>
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
        <div class="icon i-5"></div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="openNormalPlayer">
      <div class="mini-songAlbum">
        <img :src="currentSong.image" class="mini-songAlbumImg">
      </div>
      <div class="mini-player-title">
        <div class="mini-songName">{{ currentSong.name }}</div>
        <div class="mini-singerName">{{ currentSong.singer }}</div>
      </div>
      <div class="icon TongglePlay" @click.stop="togglePlay">
        <i :class="iconTogglePlay"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.url" @timeupdate="audioTime" @ended="onEnded"></audio>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import progressBar from 'base/progress-bar/progress-bar'
import { playModeType } from 'common/js/config'
import { randomList } from 'common/js/util'

export default {
  data() {
    return {
      currentAudioTime: '',
      progressNum: 0
    }
  },
  computed: {
    iconTogglePlay() {
      return !this.playing ? 'icon-play' : 'icon-pause'
    },
    iconPlayMode() {
      if (this.playMode === 0){
        return 'icon-sequence'
      } else if (this.playMode === 1) {
        return 'icon-loop'
      } else if (this.playMode === 2) {
        return 'icon-random'
      }
    },
    currentAudioTimeX() {
      return this.playing ? this.formatSongTime(this.currentAudioTime) : '00:00'
    },
    currentAudioDurationX() {
      return this.playing ? this.formatSongTime(this.currentSong.duration) : '00:00'
    },
    ...mapGetters([
      'playing',
      'playList',
      'sequenceList',
      'fullScreen',
      'currentIndex',
      'currentSong',
      'playMode'
    ])
  },
  methods: {
    openNormalPlayer() {
      this.setFullScreen(true)
    },
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
    changePlayMode() {
      let mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
    },
    audioTime(e) {
      this.currentAudioTime = e.target.currentTime
    },
    formatSongTime(time) {
      let min = time / 60 | 0
      let sec = time % 60 | 0
      return `${this.formatTimeZero(min)}:${this.formatTimeZero(sec)}`
    },
    formatTimeZero(time) {
      if (time.toString().length === 1) {
        return `0${time}`
      } else {
        return time
      }
    },
    onMoveProgress(p) {
      let time = this.currentSong.duration * p | 0
      console.log(time)
      this.$refs.audio.currentTime = time
    },
    onEnded() {
      this.nextPlay()
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlaying: 'SET_PLAYING',
      setPlayList: 'SET_PLAY_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE'
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
        this.setPlaying(true)
      })
    },
    currentAudioTime(newTime) {
      //  当前播放进度的比例
      this.progressNum = newTime / this.currentSong.duration * 100 | 0
    },
    playMode(newMode) {
      if (newMode === 0) {
        this.setPlayList(this.sequenceList)
      } else if (newMode === 1) {
        this.setPlayList(randomList(this.sequenceList))
      } else if (newMode === 2) {
        console.log(newMode)
      }
    }
  },
  components: {
    progressBar
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
      margin-top:15px
      margin-left:20px
      color: $color-theme
      font-size:20px
      transform:rotate(270deg)
    .player-title
      text-align: center
      margin:0 auto
      padding-top:10px
      overflow: hidden
      -webkit-line-clamp: 2
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-box-orient: vertical
      width:60%
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
    .progress-panel
      position:fixed
      width:100%
      bottom:20%
      margin-top:60px
      display:flex
      justify-content:center
      .progress
        width:60%
      .timeLeft
        margin-right:10px
      .timeRight
        margin-left:15px
    .player-panel
      display:flex
      position:fixed
      justify-content:center
      align-items:center
      width:100%
      bottom:5%
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
    height:60px
    background: $color-highlight-background
    display:flex
    .mini-songAlbum
      margin-top:10px
      margin-left:30px
      .mini-songAlbumImg
        width:40px
        border-radius:50%
    .mini-player-title
      margin:10px
      width:100%
      .mini-songName
        color:$color-text
        white-space: nowrap
        text-overflow:ellipsis
        overflow:hidden
        width:65%
      .mini-singerName
        margin-top:10px
        color:$color-text-l
        font-size:13px
        white-space: nowrap
        text-overflow:ellipsis
        overflow:hidden
        width:65%
    .TongglePlay
      font-size:35px
      position:fixed
      margin-top:10px
      right:60px
      color:$color-theme
</style>