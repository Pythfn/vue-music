<template>
  <div class="recommend">
    <scroll :data="discList" class="recommend-content" ref="scroll">
      <div>
        <div class="slider-box">
          <slider v-if="recommends.length">
              <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                   <img :src="item.picUrl" @load="loadImg">
                </a>
              </div>
          </slider>
        </div>
        <div class="recommend-title">
          <h1>热门歌单推荐</h1>
        </div>
        <div>
          <ul class="recommend-list">
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="img">
                <img v-lazy="item.imgurl" class="list-item-img">
              </div>
              <div class="details">
                <h2 class="title" v-html="item.creator.name"></h2>
                <span class="text" v-html="item.dissname"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading v-show="!discList.length"></loading>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === 0) {
          console.log(res)
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === 0) {
          this.discList = res.data.list
          console.log(this.discList)
        }
      })
    },
    loadImg () {
      if (!this.isLoaded) {
        this.$refs.scroll.refresh()
        this.isLoaded = true
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.recommend
  width:100%
  .recommend-content
    position: absolute
    top:88px
    bottom:0
    overflow:hidden
    width:100%
    .slider-box
      height: 0
      overflow: hidden
      padding-bottom: 40%
      background: $color-background
    .recommend-title
      text-align:center
      margin:20px 0
      color: $color-theme
    .recommend-list
      .item
        display: flex
        .img
          display: flex
          margin: 20px
          .list-item-img
            width: 60px
            height: 60px
        .details
          margin-top:20px
          line-height:30px
          align-content: center
          .text
            margin-top:5px
</style>
