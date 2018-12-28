<template>
<div class="songList">
  <ul>
    <li v-for="(item, index) in songs" :key="item.id" @click="select(item, index)">
      <div class="song-item">
        <span>{{ item.name }}</span>
        <p>{{ songDes(item) }}</p>
      </div>
    </li>
  </ul>
  <loading v-show="!songs.length" class="loading"></loading>
</div>
</template>
<script>
import Loading from 'base/loading/loading'
export default {
  props: {
    songs: Array
  },
  methods: {
    songDes(item) {
      return `${item.singer}·${item.album}`
    },
    select(item, index) {
      this.$emit('select', item, index)
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.songList
  width:100%
  height:100%
  .song-item
    padding-top:25px
    padding-left:25px
    p
      line-height:30px
      color: $color-text-d
.loading
  width:100%
  height:100%
</style>