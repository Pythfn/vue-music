<template>
  <transition name="slide">
    <music-list
     :data="data"
     :songList="songList"
     :title="singerName"
     :singerBg="singerBg"
    ></music-list>
  </transition>
</template>
<script>
import musicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDiscSongList } from 'api/recommend'
import { createSong, getSongVkey } from 'common/js/song'

export default {
  data() {
    return {
      data: [],
      songList: []
    }
  },
  components: {
    musicList
  },
  computed: {
    singerBg() {
      return this.discId.img
    },
    singerName () {
      return this.discId.name
    },
    ...mapGetters([
      'discId'
    ])
  },
  methods: {
    _getDiscSongList() {
      getDiscSongList(this.discId).then((json) => {
        if(1){
          console.log(json)
        }
      })
    }
  },
  created () {
    if (!this.discId) {
      this.$router.push('/recommend')
    }
    this._getDiscSongList()
  }
}

</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.2s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>