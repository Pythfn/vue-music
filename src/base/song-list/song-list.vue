<template>
<div class="songList">
  <ul>
    <li v-for="(item, index) in songs" :key="item.id" @click="select(item, index)">
      <div class="song-item">
        <div class="song-index" v-show="indexIcon">
          <span :class="getIconClass(index)" v-text="getIconIndex(index)"></span>
        </div>
        <div class="song-dec">
          <span>{{ item.name }}</span>
          <p>{{ songDes(item) }}</p>
        </div>
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
    songs: Array,
    indexIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    songDes(item) {
      return `${item.singer}·${item.album}`
    },
    select(item, index) {
      this.$emit('select', item, index)
    },
    getIconClass(index) {
      return index > 2 ? 'iconNum' : `iconNum topicon${index}`
    },
    getIconIndex(index) {
      return index > 2 ? index : ''
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
  .song-item
    display:flex
    padding-top:25px
    margin-left:30px
    margin-right:30px
    font-size:15px
    .song-dec
      overflow: hidden
      flex: 1
      line-height: 20px
      p, span
        color: $color-text-d
        text-overflow:ellipsis
        overflow:hidden
        white-space: nowrap
      span
        color:white
    .song-index
      flex:0 0 25px
      width: 25px
      margin-right: 30px
      text-align: center
      .iconNum
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
        line-height:24px
        &.topicon0
          background-image: url('first@2x.png')
        &.topicon1
          background-image: url('second@2x.png')
        &.topicon2
          background-image: url('third@2x.png')
.loading
  width:100%
  height:100%
</style>