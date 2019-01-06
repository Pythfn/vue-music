<template>
  <div class="result">
    <div class="result-list">
      <scroll
       class="scroll"
       :data="resultList"
       :endEmit="true"
       @isScrollEnd="isScrollEnd"
      >
        <div>
          <ul>
            <li
             v-for="item in resultList"
             class="resultItem"
            >
              <i :class="resultType(item)"></i>
              <span v-html="getResultItem(item)"></span>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { search } from 'api/search'
import { createSong, getSongVkey } from 'common/js/song'
import Singer from 'common/js/singer'
import Scroll from 'base/scroll/scroll'
//  一次请求多少条目
const PERPAGE = 20
const TYPE_SINGER = 'singer'
//  const TYPE_ALBUM = 'album'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      resultList: [],
      resultLists: [],
      resultEnd: false
    }
  },
  methods: {
    getResultItem(item) {
      if (item.type === TYPE_SINGER) {
        return `${item.singername}`
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    resultType(item) {
      if (item.type === TYPE_SINGER) {
        return `icon-mine`
      } else {
        return `icon-music`
      }
    },
    search() {
      if (this.query.length && !this.resultEnd) {
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === 0) {
            let tempList = res.data.song.list
            this.getResultList(res.data)
          }
          console.log(this.page)
        })
      }
    },
    getResultList(data) {
      let list = []
      let songs = []
      if (data.zhida && data.zhida.singerid) {
        list.push({ ...data.zhida, 'type': TYPE_SINGER })
        //  singer.push(new Singer(data.zhida.singerid,data.zhida.singername,'singer'))
      }
      let songlist = data.song.list

      if (songlist) {
        songlist.forEach((item) => {
          if (item.songid && item.albummid) {
            getSongVkey(item.songmid).then((res) => {
              let vk = res.data.items[0].vkey
              songs.push(createSong(item, vk))
            })
          }
        })
      }
      setTimeout(()=>{
        //  list = list.concat(songs)
        //  this.resultList = list.concat(songs)
        this.resultList = list.concat(songs)
        console.log(this.resultList)
      }, 200)
    },
    isScrollEnd() {
      this.page++
      this.search()
    }
  },
  created() {},
  watch: {
    query(newValue, oldValue) {
      if (newValue === oldValue) {
        this.page = 1
        this.search()
        console.log(oldValue)
      } else {
        this.resultList = []
        this.page = 1
        this.search()
      }
    }
  },
  components: {
    Scroll
  }

}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.result
  .result-list
    .scroll
      position:absolute
      top:140px
      bottom:0
      left:0
      right:0
      background:$color-background
      padding:20px 20px
      overflow:hidden
      .resultItem
        color:$color-text-l
        padding:10px 5px
        i
          margin-right:10px
</style>