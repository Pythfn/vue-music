<template>
  <div class="play-list">
    <ul>
      <li
       v-for="item in playList"
       :key="item.id"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'playList'
    ])
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.play-list
  position:fixed
  bottom:60px
  height:50%
  background:$color-background
  width:100%
  overflow:hidden
</style>