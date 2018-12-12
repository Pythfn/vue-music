<template>
  <div class="singer">
    <scroll class="bscroll" :data="singerList">
      <div class="singer-list">
        <ul v-for="ul in singerList" :key="ul.title" class="singer-ul">
          <h2 class="singer-title">{{ ul.title }}</h2>
          <li v-for="item in ul.items" :key="item.id" class="singer-item">
            <div class="singer-img">
              <img v-lazy="item.img">
            </div>
              <div class="singer-name">
                <span>{{ item.name }}</span>
              </div>
          </li>
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
@import '~common/stylus/variable.styl'
.singer
  width: 100%
  .bscroll
    position: absolute
    top:88px
    bottom: 0
    width:100%
    overflow: hidden
    .singer-title
      background:$color-text-d
      padding:10px 0
      padding-left:20px
    .singer-item
      display: flex
      .singer-img
        margin:10px 20px
      .singer-img img
        width: 50px
        height: 50px
        border-radius: 50px
       .singer-name
         line-height: 60px
         color:$color-text-l
</style>