<template>
  <div class="result">
    <div class="result-list">
      <scroll class="scroll" :data="resultList" :endEmit="true" @isScrollEnd="isScrollEnd">
        <div>
          <ul>
            <li v-for="item in resultList" class="resultItem rsong"> {{ item.name }} - {{ item.singer }}</li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { search } from 'api/search'
import { createSong, getSongVkey } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
const PERPAGE = 20
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
      resultList: []
    }
  },
  methods: {
    search() {
      if (this.query.length) {
        this.page ++
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
            if (res.code === 0) {
              let tempList = res.data.song.list
              tempList.forEach((item) => {
                getSongVkey(item.songmid).then((res) => {
                  let vk = res.data.items[0].vkey
                  let song = createSong(item, vk)
                  this.resultList.push(song)
                })
              })
            }
          console.log(this.resultList)
        })
      }
    },
    isScrollEnd() {
      this.search()
    }
  },
  created() {
  },
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
  components:{
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
</style>