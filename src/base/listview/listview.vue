<template>
  <div class="list">
    <scroll class="bscroll" ref="scroll" :data="list" :listenScroll="true" @scroll="scroll">
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
        <li v-for="item in alphaList" :key="item">{{ item }}</li>
      </ul>
    </div>
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
    }
  },
  created() {
    this.listGroupHeight = []
  },
  updated() {
    this.getListGroupHeight()
  },
  methods: {
    scroll(p) {
      this.scrollY = -p.y
    },
    getListGroupHeight() {
      const listGroup = this.$refs.listGroup
      let groupHeight = 0
      this.listGroupHeight.push(0)
      for (let i = 0; i < listGroup.length; i++) {
        let item = listGroup[i]
        groupHeight += item.clientHeight
        this.listGroupHeight.push(groupHeight)
        console.log(this.listGroupHeight[i])
      }
    }
  },
  watch: {
    scrollY (newy) {
      const a = ''
      for (let i=0; i<this.listGroupHeight.length; i++){
        let top = this.listGroupHeight[i]
        let bottom = this.listGroupHeight[i+1]
        if(newy >= top && newy <=bottom){
          console.log(i)
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
      margin-top: 5px
      font-size: 12px
</style>