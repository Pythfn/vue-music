<template>
  <div class="rank">
    <scroll :data="rankList" class="rankScroll">
      <div class="rankList">
        <div v-for="item in rankList" class="rankItem" :key="item.id">
          <div class="rankImg">
            <img v-lazy="item.picUrl">
          </div>
            <div class="rankdec">
              <ul>
                <li v-for="(song, index) in item.songList" :key="index">
                  {{ index + 1 }} {{ song.songname }}-{{ song.singername }}</li>
              </ul>
            </div>
          </div>
        </div>
    </scroll>
  </div>
</template>
<script>
import { getTopList } from 'api/rank'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      rankList: []
    }
  },
  components: {
    Scroll
  },
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        this.rankList = res.data.topList
        //  console.log(this.rankList)
      })
    }
  },
  created() {
    this._getTopList()
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.rank
  .rankScroll
    position:fixed
    left:0
    right:0
    bottom:0
    top:88px
    overflow:hidden
    .rankList
      width:100%
      .rankItem
        display:flex
        margin:20px
        height:100px
        background:$color-highlight-background
        .rankImg img
          width:100px
          height:100px
        .rankdec
          margin:10px
          line-height:22px
          font-size:13px
          color:$color-text-l
</style>
