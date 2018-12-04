<template>
  <div class="recommend">
    <div class="slider"  v-if="recommends.length">
      <div v-for="item in recommends" :key="item.id">
        <a :href="item.linkUrl">
           <img :src="item.picUrl">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecommend } from 'api/recommend'
export default {
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === 0) {
          console.log(res)
          this.recommends = res.data.slider
        }
      })
    }
  }
}

</script>
<style lang="stylus">
</style>
