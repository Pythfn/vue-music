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
             @click="selectItem(item)"
            >
              <i :class="resultType(item)"></i>
              <span v-html="getResultItem(item)"></span>
            </li>
            <loading
             v-show="loadingNext"
             class="loading"
            ></loading>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { search } from 'api/search'
import { createSong, getSongVkey } from 'common/js/song'
import { mapActions } from 'vuex'
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'

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
      copyresultLists: [],
      nextPage: true,
      loadingNext: false
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
            this._getResultList(res.data).then((res) => {
              this.resultList = res
            })
          }
          console.log('result-page：' + this.page)
        })
      }
    },
    searchMore() {
      if (this.nextPage) {
        this.loadingNext = true
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === 0) {
            let tempList = res.data.song.list
            this._getResultList(res.data).then((res) => {
              this.resultList = Object.assign(res, this.resultList)
              console.log(this.resultList)
              this.loadingNext = false
            })
          }
        })
        console.log('result-page：' + this.page)
      }
    },
    async _getResultList(data) {
      //  问题：singer和songs不能使用concat合并数组
      let list = []
      let songs = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        list.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
        //  singer.push(new Singer(data.zhida.singerid,data.zhida.singername,'singer'))
      }
      let songlist = data.song.list
      //  检查查询是否到末尾
      let maxPage = data.song.totalnum / PERPAGE
      if (this.page >= maxPage) {
        this.nextPage = false
      }
      console.log('maxPage：' + maxPage)

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
      //  数组转换为对象，使用对象合并方法，不能用concat
      list = Object.assign(songs, list)
      //  console.log(typeof(list))
      return list
    },
    isScrollEnd() {
      this.page++
      console.log('scrollendddd')
      this.searchMore()
    },
    selectItem(item) {
      console.log(item)
      this.insterSong(item)
    },
    ...mapActions([
      'insterSong'
    ])
  },
  watch: {
    query(newValue, oldValue) {
      if (newValue === oldValue) {
        this.page = 1
        this.nextPage = true
        this.search()
        //  console.log(oldValue)
      } else {
        this.resultList = []
        this.page = 1
        this.nextPage = true
        this.search()
      }
    }
  },
  components: {
    Scroll,
    loading
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