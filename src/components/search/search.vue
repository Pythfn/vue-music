<template>
  <div class="search">
    <search-box @query="queryChanged" ref="searchBox"></search-box>
    <result :query="query" v-show="query.length"></result>
    <div class="hotKeyBox">
      <ul>
        <div class="hotKeyTitle">
          <span>热门搜索</span>
        </div>
        <li
         v-for="hk in hotKeyList"
         :key="hk.n"
         class="hotKeyItem"
         @click="setHotQuery(hk.k)"
        >
          {{ hk.k }}
        </li>
      </ul>
    </div>
    <div class="searchHistory">
      <div class="title">
        <span class="text">搜索历史</span>
        <span class="clear">
          <i class="icon-clear"></i>
        </span>
      </div>
      <search-list :searchlist="searchHistory"></search-list>
    </div>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Result from 'components/result/result'
import searchList from 'base/search-list/search-list'
import { mapActions, mapGetters } from 'vuex'
import { getHotKey } from 'api/search'
export default {
  data() {
    return {
      hotKeyList: [],
      query: ''
    }
  },
  components: {
    SearchBox,
    Result,
    searchList
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  created() {
    this._getHotKey()
    this.saveSearchHistory('ssss')
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res) => {
        this.hotKeyList = res.data.hotkey.slice(0, 10)
      })
    },
    setHotQuery(newQ) {
      this.$refs.searchBox.setHotQuery(newQ)
    },
    queryChanged(newQ) {
      this.query = newQ
    },
    ...mapActions([
      'saveSearchHistory'
    ])
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
  .searchHistory
    .title
      display:flex
      margin:20px
      color:$color-text-l
      .text
        flex:1
      
</style>