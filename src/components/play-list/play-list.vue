<template>
  <div class="list" @click="isShow" v-if="show">
    <div class="play-list">
      <div class="play-list-bar">
        <div @click="cleanList">
          <span>Delete</span>
        </div>
      </div>
      <scroll class="scroll" :data="sequenceList" ref="scrollss">
        <div>
          <ul>
            <li
             v-for="(song, index) in sequenceList"
             :key="song.id"
             class="list-Item"
             ref="listItemGroup"
            >
              <i :class="setPlayingIcon(song)" class="icon" v-text="setSongItem(song, index)"></i>
              <span class="text">{{ song.name }}</span>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="closeButtom" @click.stop="isShow">
      <span>关闭</span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      show: false,
      listGroup: []
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'sequenceList',
      'currentSong',
      'currentIndex'
    ])
  },
  methods: {
    isShow() {
      this.show = !this.show
    },
    cleanList() {
      this.setPlayList([])
    },
    setPlayingIcon(song) {
      if (song.id === this.currentSong.id) {
        return 'icon-play'
      }
    },
    setSongItem(song, index) {
      if (song.id === this.currentSong.id) {
        return ''
      } else {
        return index + 1
      }
    },
    ...mapMutations({
      setPlayList: 'SET_PLAY_LIST'
    })
  },
  watch: {
    show(newShow) {
      if (newShow) {
        setTimeout(()=> {
          console.log(this.listGroup)
          this.$refs.scrollss.scrollToElement(this.listGroup[this.currentIndex], 0)
        },1000)
      }
    },
    sequenceList(newList) {
      this.listGroup = this.$refs.listItemGroup
    }
  },
  components: {
    Scroll
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.list
  position:fixed
  top:0
  left:0
  right:0
  bottom:0
  .play-list
    position:fixed
    left:0
    right:0
    bottom:0px
    height:60%
    margin:20px 10px
    .play-list-bar
      position:fixed
      width:100%
      background:red
    .scroll
      position:fixed
      bottom:50px
      height:50%
      left:0
      right:0
      background:$color-highlight-background
      overflow:hidden
      .list-Item
        margin:20px 30px
        display:flex
        .icon
          text-align: center
          flex: 0 0 30px
        .text
          flex:1
  .closeButtom
    background:$color-background
    position:fixed
    left:0
    right:0
    bottom:0px
    height:51px
    text-align:center
    line-height:50px
</style>