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
import { getSingerDetail } from 'api/singer'
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
      return this.getSinger.img
    },
    singerName () {
      return this.getSinger.name
    },
    ...mapGetters([
      'getSinger'
    ])
  },
  methods: {
    _getSingerDetail() {
      getSingerDetail(this.getSinger.id).then((data) => {
        if (data.subcode === 0) {
          this.data = data.data.list
          //  console.log(this.data)
          this.data.forEach((item) => {
            let { musicData } = item
            getSongVkey(musicData.songmid).then((res) => {
              // console.log('这首歌的vkey获取到了')
              const vkey = res.data.items[0].vkey
              this.songList.push(createSong(musicData, vkey))
            })
          })
          //  console.log(this.songList)
        }
      })
    }
  },
  created () {
    if (!this.getSinger.name) {
      this.$router.push('/singer')
    }
    this._getSingerDetail()
  }
}

</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.2s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>