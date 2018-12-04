<template>
  <div class="recommend">
    推荐
  </div>
</template>
<script>
import { getRecommend } from 'api/recommend'
export default {
  date () {
    return {
      sliderList: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        this.sliderList = res.data
        console.log(this.sliderList)
      })
    }
  }
}

</script>
<style lang="stylus">
</style>
