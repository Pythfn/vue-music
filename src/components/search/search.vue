<template>
  <div class="search">
    <search-box @query="queryChanged" ref="searchBox"></search-box>
    <scroll class="scroll" :data="scrollData">
      <div>
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
              <i class="icon-clear" @click="clearSearch"></i>
            </span>
          </div>
          <search-list :searchlist="searchHistory" @removeItem="removeSearchItem" @selectItem="selectSearchItem"></search-list>
        </div>
      </div>
    </scroll>
    <result :query="query" v-show="query.length"></result>
    <confirm ref="confirm" @selectNo="selectNo" @selectYes="selectYes"></confirm>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import Result from 'components/result/result'
import searchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import { mapActions, mapGetters } from 'vuex'
import { getHotKey } from 'api/search'
export default {
  data() {
    return {
      hotKeyList: [],
      query: '',
      searhh: []
    }
  },
  components: {
    SearchBox,
    Result,
    searchList,
    Scroll,
    Confirm
  },
  computed: {
    scrollData() {
      return this.hotKeyList.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  created() {
    this._getHotKey()
    this.getSearchHistory()
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res) => {
        this.hotKeyList = res.data.hotkey.slice(0, 10)
      })
    },
    setHotQuery(newQ) {
      this.$refs.searchBox.setQuery(newQ)
    },
    queryChanged(newQ) {
      this.query = newQ
      this.saveSearchHistory(newQ)
    },
    selectSearchItem(query) {
      this.$refs.searchBox.setQuery(query)
    },
    removeSearchItem(query) {
      this.removeSearchHistory(query)
    },
    clearSearch() {
      this.$refs.confirm.isShow()
    },
    selectNo() {
      this.$refs.confirm.isHide()
    },
    selectYes() {
      this.clearSearchHistory()
      this.$refs.confirm.isHide()
    },
    ...mapActions([
      'saveSearchHistory',
      'removeSearchHistory',
      'getSearchHistory',
      'clearSearchHistory'
    ])
  }
}

</script>
<style lang="stylus">
@import '~common/stylus/variable.styl'
.search
  width:100%
  .scroll
    position:fixed
    left:0
    right:0
    bottom:0
    top:140px
    overflow:hidden
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