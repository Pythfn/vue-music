<template>
  <transition name="slide">
    <music-list :data="data" :songList="songList" :title="topName" :singerBg="topBg" :songListIndex="true"></music-list>
  </transition>
</template>
<script>
import musicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { createSong, getSongVkey } from 'common/js/song'
export default {

  data() {
    return {
      data: [],
      songList: [],
      topName: '',
      topBg: ''
    }
  },
  components: {
    musicList
  },
  computed: {
    ...mapGetters([
      'topId'
    ])
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topId.id).then((res) => {
        //  console.log(res)
        //  解析jsoncallback方法为json对象
        if (res.code === 0) {
          this.topBg = res.topinfo.pic_album
          this.topName = res.topinfo.ListName
          this.data = res.songlist
          //  console.log(this.data)
          setTimeout(() => {
            this.data.forEach((item) => {
              let { data } = item
              getSongVkey(data.songmid).then((res) => {
                // console.log('这首歌的vkey获取到了')
                const vkey = res.data.items[0].vkey
                this.songList.push(createSong(data, vkey))
              })
            })
            //  console.log(this.songList)
          }, 200)
        }
      })
    }
  },
  created() {
    if (!this.topId.id) {
      this.$router.push('/rank')
    }
    setTimeout(() => {
      this._getMusicList()
    }, 0)
  }
}

</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.2s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>