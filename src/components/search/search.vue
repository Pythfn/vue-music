<template>
  <div class="search">
    <search-box :newQuery="newQuery"></search-box>
    <div class="hotKeyBox">
      <ul>
        <div class="hotKeyTitle">
          <span>热门搜索</span>
        </div>
        <li v-for="hk in hotKeyList" :key="hk.n" class="hotKeyItem" @click="setQuery(hk.k)">
          {{ hk.k }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
export default {
  data() {
    return {
      hotKeyList: [],
      newQuery:''
    }
  },
  components: {
    SearchBox
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res) => {
        this.hotKeyList = res.data.hotkey.slice(0, 10)
      })
    },
    setQuery(newItem) {
      this.newQuery = newItem
    }
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable.styl'
.search
  width:100%
  .hotKeyBox
    display:flex
    margin:20px 20px
    .hotKeyTitle
      margin-bottom:10px
      color:$color-text-l
    .hotKeyItem
      display: inline-block
      color:$color-text-d
      text-align:center
      padding:5px 10px
      border-radius:5px
      background:$color-highlight-background
      margin:0 20px 10px 0px
      font-size:$font-size-medium
</style>