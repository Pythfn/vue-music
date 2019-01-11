<template>
  <div
   class="list"
   @click="isShow"
   v-if="show"
  >
    <div class="play-list">
      <div class="play-list-bar" @click.stop>
        <div class="changeMode icon i-1" @click="changePlayMode">
          <i :class="iconPlayMode"></i>
        </div>
        <div class="clearList" @click="cleanList">
          <i class="icon-clear"></i>
        </div>
      </div>
      <scroll
       class="scroll"
       :data="sequenceList"
       ref="scroll"
      >
        <div>
          <ul>
            <li
             v-for="(song, index) in sequenceList"
             :key="song.id"
             class="list-Item"
             ref="listItemGroup"
             @click="changeSong(song)"
            >
              <i :class="setPlayingIcon(song)" class="icon" v-text="setSongItem(song, index)"></i>
              <span class="text">{{ song.name }}</span>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div
     class="closeButtom"
     @click.stop="isShow"
    >
      <span>关闭</span>
    </div>
    <confirm ref="confirm" @selectNo="selectNo" @selectYes="selectYes"></confirm>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playModeType } from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
export default {
  data() {
    return {
      show: false,
      listGroup: []
    }
  },
  computed: {
    iconPlayMode() {
      if (this.playMode === playModeType.sequence) {
        return 'icon-sequence'
      } else if (this.playMode === playModeType.loop) {
        return 'icon-loop'
      } else if (this.playMode === playModeType.random) {
        return 'icon-random'
      }
    },
    ...mapGetters([
      'playList',
      'sequenceList',
      'currentSong',
      'currentIndex',
      'playMode'
    ])
  },
  methods: {
    isShow() {
      this.show = !this.show
    },
    cleanList() {
      this.$refs.confirm.isShow()
    },
    selectYes() {
      this.clearPlayList()
      this.$refs.confirm.isHide()
      this.isShow()
    },
    selectNo() {
      this.$refs.confirm.isHide()
    },
    changeSong(song) {
      let newIndex = this.playList.findIndex((item) => {
        return item.id === song.id
      })
      this.setCurrentIndex(newIndex)
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
    changePlayMode() {
      let mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
    },
    //  滚动到当前播放的歌曲
    scrollToCurrentSong() {
      if (this.listGroup === undefined) {
        this.listGroup = this.$refs.listItemGroup
      }
      let cindex = this.sequenceList.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.$refs.scroll.scrollToElement(this.listGroup[cindex], 0)
    },
    ...mapActions([
      'clearPlayList'
    ]),
    ...mapMutations({
      setPlayList: 'SET_PLAY_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE'
    })
  },
  watch: {
    show(newShow) {
      if (newShow) {
        setTimeout(() => {
          this.scrollToCurrentSong()
        }, 200)
      }
    },
    //  当顺序列表改变 重新获取列表的li
    sequenceList(newList) {
      this.listGroup = this.$refs.listItemGroup
    }
  },
  components: {
    Scroll,
    Confirm
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
    height:65%
    .play-list-bar
      width:100%
      display:flex
      background:$color-background
      justify-content: space-between
      .changeMode
        font-size:30px
        margin:10px
        color:$color-theme
      .clearList
        font-size:30px
        margin:10px
        color:$color-theme
    .scroll
      position:fixed
      bottom:50px
      height:50%
      left:0
      right:0
      background:$color-highlight-background
      overflow:hidden
      .list-Item
        padding-top:10px
        padding-bottom:10px
        margin:0 20px
        display:flex
        font-size:14px
        color:$color-text-l
        .icon
          text-align: center
          flex: 0 0 30px
        .text
          flex:1
          text-overflow:ellipsis
          overflow:hidden
          white-space:nowrap
          width:80%
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