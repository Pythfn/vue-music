<template>
  <div class="singer">
    geshou
  </div>
</template>
<script>
import { getSingerList } from 'api/singer.js'
import Singer from 'common/js/singer.js'
export default {
  data() {
    return {
      singerList: [],
      tempList: []
    }
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
      let newList = []
      let temp = []
      let hotList = [{
        title: '热门',
        items: []
      }]
      hotList.items = []
      list.forEach((item) => {
        temp.push(new Singer(item.Fsinger_mid, item.Fsinger_name, item.Findex))
      })
      for (let i = 0; i < hotSingerLength; i++) {
        hotList.items.push(temp[i])
      }
      newList.push(hotList)
      temp.forEach((item) => {
        if (item.key.search(/^[a-zA-Z]$/) === 0) {
          if (!newList[item.key]) {
            newList[item.key] = []
          }
          newList[item.key].push(item)
        }
      })
      return newList
    }
  }
}

</script>
