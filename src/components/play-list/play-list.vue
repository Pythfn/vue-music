<template>
  <div class="list">
    <div class="play-list">
      <div class="play-list-bar">
        <div @click="cleanList">
          <span>Delete</span>
        </div>
      </div>
      <scroll class="scroll" :data="playList">
        <div>
          <ul>
            <li
             v-for="(item, index) in sequenceList"
             :key="item.id"
             class="list-Item"
            >{{ index + 1 }} {{ item.name }}</li>
          </ul>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'base/scroll/scroll'
export default {
  computed: {
    ...mapGetters([
      'playList',
      'sequenceList'
    ])
  },
  methods: {
    cleanList() {
      this.setPlayList([])
    },
    ...mapMutations({
      setPlayList: 'SET_PLAY_LIST'
    })
  },
  components: {
    Scroll
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.play-list
  position:fixed
  top:50%
  left:0
  right:0
  bottom:60px
  background:red
  margin:20px 10px
  .play-list-bar
    position:fixed
    width:100%
    background:red
  .scroll
    width:100%
    position:fixed
    bottom:60px
    height:50%
    background:$color-background
    overflow:hidden
    .list-Item
      margin:20px
</style>