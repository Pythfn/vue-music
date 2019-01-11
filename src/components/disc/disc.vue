<template>
  <transition name="slide">
    <music-list :data="data" :songList="songList" :title="discName" :singerBg="singerBg"></music-list>
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
      songList: [],
      singerBg: ''
    }
  },
  components: {
    musicList
  },
  computed: {
    discName() {
      return this.discId.dissname
    },
    ...mapGetters([
      'discId'
    ])
  },
  methods: {
    _getDiscSongList() {
      getDiscSongList(this.discId.dissid).then((res) => {
        //  解析jsoncallback方法为json对象
        let temp = res.substring(12)
        /* eslint-disable */
        let json = eval('(' + temp + ')')
        /* eslint-disable */
        if (json.code === 0) {
          this.singerBg = json.cdlist[0].logo
          this.data = json.cdlist[0].songlist
          //  console.log(this.data)
          this.data.forEach((item) => {
            let { songmid } = item
            getSongVkey(songmid).then((res) => {
              // console.log('这首歌的vkey获取到了')
              const vkey = res.data.items[0].vkey
              this.songList.push(createSong(item, vkey))
            })
          })
          //  console.log(this.songList)
        }
      })
    }
  },
  created() {
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