<template>
  <div class="singer">
    <scroll class="bscroll">
      <div>
        <ul>
          <ul v-for="item of singerList">
            {{ item.title }}
          </ul>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer.js'
import Singer from 'common/js/singer.js'
import scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      singerList: [],
      tempList: []
    }
  },
  components: {
    scroll
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
      let newList = {
        hot : {
          title: '热门',
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
      return newList
    }
  }
}

</script>
