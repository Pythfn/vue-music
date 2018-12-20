<template>
  <div class="list">
    <scroll class="bscroll" ref="scroll" :data="list" :listenScroll="true" @scroll="scroll" :probetype=3>
      <div class="list-box">
        <ul v-for="ul in list" :key="ul.title" class="list-ul" ref="listGroup">
          <h2 class="list-title">{{ ul.title }}</h2>
          <li v-for="item in ul.items" :key="item.id" class="list-item">
            <div class="list-img">
              <img v-lazy="item.img">
              </div>
              <div class="list-name">
                <span>{{ item.name }}</span>
              </div>
          </li>
        </ul>
      </div>
    </scroll>
    <div class="alphaList">
      <ul>
        <li v-for="(item, key) in alphaList" :key="key" :class="{'isselect' : listIndex === key }" @touchstart="touchTo" @touchmove.stop.prevent="touchMoveTo">{{ item }}</li>
      </ul>
    </div>
    <div class="grouptitle" v-show="grouptitle" v-text="grouptitle"></div>
  </div>
</template>
<script type="text/javascript">
import scroll from 'base/scroll/scroll'
export default {
  props: {
    list: Array
  },
  data() {
    return {
      listGroupHeight: [],
      scrollY: -1,
      listIndex: 0
    }
  },
  components: {
    scroll
  },
  computed: {
    alphaList() {
      return this.list.map((res) => {
        return res.title.substr(0, 1)
      })
    },
    grouptitle() {
      if (this.scrollY < 0) {
        return ''
      }
      return this.list[this.listIndex] ? this.list[this.listIndex].title : ''
    }
  },
  created() {
    this.ALPHALIST_TOPHEIGHT = 130
    this.ALPHAITEM_HEIGHT = 20
    this.listGroupHeight = []
    this.listGroup = []
  },
  updated() {
    this.getListGroupHeight()
  },
  methods: {
    scroll(p) {
      this.scrollY = -p.y
    },
    getListGroupHeight() {
      this.listGroup = this.$refs.listGroup
      let groupHeight = 0
      this.listGroupHeight.push(0)
      for (let i = 0; i < this.listGroup.length; i++) {
        let item = this.listGroup[i]
        groupHeight += item.clientHeight
        this.listGroupHeight.push(groupHeight)
      }
    },
    touchTo(e) {
      let scrollIndex = Math.round((e.targetTouches[0].pageY - this.ALPHALIST_TOPHEIGHT) / this.ALPHAITEM_HEIGHT)
      this.$refs.scroll.scrollToElement(this.listGroup[scrollIndex], 0)
      this.listIndex = scrollIndex
    },
    touchMoveTo(e) {
      setTimeout(() => {
        let scrollIndex = Math.round((e.targetTouches[0].pageY - this.ALPHALIST_TOPHEIGHT) / this.ALPHAITEM_HEIGHT)
        if (scrollIndex > this.listGroup.length - 1 || scrollIndex < 0) {
          return
        }
        this.$refs.scroll.scrollToElement(this.listGroup[scrollIndex], 0)
        this.listIndex = scrollIndex
        console.log(this.listIndex)
      }, 50)
    }
  },
  watch: {
    scrollY(newy) {
      for (let i = 0; i < this.listGroupHeight.length; i++) {
        let top = this.listGroupHeight[i]
        let bottom = this.listGroupHeight[i + 1]
        if (newy >= top && newy <= bottom) {
          this.listIndex = i
          return
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.list
  width: 100%
  .bscroll
    position: absolute
    top:88px
    bottom: 0
    width:100%
    overflow: hidden
    .list-title
      background:$color-text-d
      padding:8px 0
      padding-left:20px
      margin-bottom:20px
      font-size:13px
    .list-item
      display: flex
      padding-bottom:20px
      .list-img
        margin:0 20px
      .list-img img
        width: 50px
        height: 50px
        border-radius: 50px
       .list-name
         line-height: 40px
         color:$color-text-l
  .alphaList
    position: absolute
    background: black
    padding:4px
    padding-top:20px
    padding-bottom:20px
    top:100px
    right: 0
    text-align:center
    opacity:0.5
    border-radius:25px
    li
      font-size: 15px
      height: 20px
    .isselect
      color: red
  .grouptitle
    position:absolute
    background:black
    top:88px
    left:0
    right:0
    padding:8px 0
    padding-left:20px
    margin-bottom:20px
    font-size:13px
</style>