<template>
  <div class="recommend">
    <div class="slider-box" v-if="recommends.length">
      <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
               <img :src="item.picUrl">
            </a>
          </div>
      </slider>
    </div>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import Slider from 'base/slider/slider'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider
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
          console.log(res)
          this.discList = res.data.list
        }
      })
    }
  }
}

</script>
<style lang="stylus" scoped>
  .recommend
    width:100%
    overflow:hidden
    .slider-box
      width: 100%
      overflow: hidden
</style>
