<template>
  <div class="singer" ref="singer">
    <listview :list="singerList" @select="selectSinger" ref="singerList"></listview>
    <loading v-show="!singerList.length"></loading>
  <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer.js'
import Singer from 'common/js/singer.js'
import listview from 'base/listview/listview'
import loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
import { playerMixin } from 'common/js/mixin'

export default {
  mixins: [playerMixin],
  data() {
    return {
      singerList: [],
      tempList: []
    }
  },
  components: {
    scroll,
    listview,
    loading
  },
  methods: {
    setPlayerHeightMixin(playList) {
      let height = playList.length ? this.PLAYER_HEIGHT : ''
      this.$refs.singer.style.bottom = height
      this.$refs.singerList.refresh()
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === 0) {
          this.singerList = this.formatList(res.data.list)
        //  console.log(this.singerList)
        }
      })
    },
    //  格式化jsonp数据格式
    formatList(list) {
      let hotSingerLength = 10
      const HOT_NAME = '热门'
      let newList = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      let temp = []
      newList.hot.items = []
      list.forEach((item) => {
        temp.push(new Singer(item.Fsinger_mid, item.Fsinger_name, item.Findex))
      })
      for (let i = 0; i < hotSingerLength; i++) {
        newList.hot.items.push(temp[i])
      }
      temp.forEach((item) => {
        if (item.key.search(/^[a-zA-Z]$/) === 0) {
          if (!newList[item.key]) {
            newList[item.key] = {
              title: item.key,
              items: []
            }
          }
          newList[item.key].items.push(item)
        }
      })

      //  singerlist 对象排序
      let hot = []
      let alpha = []
      for (let key in newList) {
        let val = newList[key]
        if (val.title !== HOT_NAME) {
          alpha.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      alpha.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(alpha)
    },

    // 将子组件点击的歌手item传递到父组件singer，再储存进vuex
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    })
  },
  created() {
    this._getSingerList()
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position:fixed
  bottom:0
  left:0
  right:0
  top:88px
</style>