<template>
  <div class="player" v-show="playing">
    <div class="normal-player" v-show="fullScreen">
      标准播放器
    </div>
    <div class="mini-player" v-show="fullScreen">
      迷你播放器
    </div>
    <audio :src="currentSong.url"></audio>
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
  }
}

</script>

<style lang="stylus" scoped>
.player
  background: red
  position:fixed
  bottom:0
  left:0
  right:0
  top:0
  .mini-player
    position:fixed
    background:blue
</style>