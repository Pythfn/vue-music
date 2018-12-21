<template>
  <transition name="slide">
    <div class="singer-detail">
      <div class="singer-title">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <div class="singerName">{{ getSinger.name}}</div>
      </div>
      <div>
        <img :src="singerImage" class="singerImage">
      </div>
      <div class="song-list">
        <ul>
          <li v-for="item in data.list">{{ item.musicData.albumname }}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    singerImage() {
      return this.getSinger.img
    },
    ...mapGetters([
      'getSinger'
    ])
  },
  mounted () {
    getSingerDetail(this.getSinger.id).then((data) => {
      if(data.subcode === 0) {
        this.data = data.data
        console.log(data)
        console.log(this.data)
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.singer-detail
  position: absolute
  top: 0
  bottom: 0
  left:0
  right:0
  background: $color-background
  z-index: 99
  .singer-title
    position:absolute
    top:0
    left:0
    right:0
    .back
      width:42px
      height:42px
      text-align:center
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .singerName
      position:absolute
      top:0
      left:0
      right:0
      bottom:0
      text-align: center
      font-size:22px
      margin-top:10px
  .singerImage
    width:100%
.slide-enter-active, .slide-leave-active
  transition: all 0.2s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

</style>