<template>
  <div class="player" v-show="playing">
    <div class="normal-player" v-show="fullScreen">
      <div class="back" @click.prevent="minimizePlay">
        <i class="icon-back"></i>
      </div>
      <div class="player-title">
        <div class="songName">{{ currentSong.name }}</div>
        <div class="singerName">{{ currentSong.singer }}</div>
      </div>
      <div class="songAlbum">
        <img :src="currentSong.image" class="songAlbumImg">
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'playing',
      'fullScreen',
      'currentSong'
    ])
  },
  methods: {
    minimizePlay() {
      this.$store.state.fullScreen = false
      this.$refs.audio.play()
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
    .songAlbum
      margin:0 auto
      text-align: center
      margin-top:50px
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