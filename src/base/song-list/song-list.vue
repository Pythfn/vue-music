<template>
<div class="songList">
  <ul>
    <li v-for="item in songs" :key="item.id">
      <div class="song-item">
        <span>{{ item.name }}</span>
        <p>{{ songDes(item) }}</p>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  props: {
    songs: Array
  },
  methods: {
    songDes(item) {
      return `${item.singer}·${item.album}`
    }
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
</style>