<template>
  <div class="singer">
    <listview :list="singerList"></listview>
  </div>
</template>
<script>
import { getSingerList } from 'api/singer.js'
import Singer from 'common/js/singer.js'
import listview from 'base/listview/listview'
export default {
  data() {
    return {
      singerList: [],
      tempList: []
    }
  },
  components: {
    scroll,
    listview
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === 0) {
          this.singerList = this.formatList(res.data.list)
          console.log(this.singerList)
        }
      })
    },
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>