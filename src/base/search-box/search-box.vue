<template>
  <div class="search-box">
    <i class="icon-search"></i>
      <input class="input" v-model="query" :placeholder="placeholder"/>
    <i class="icon-dismiss" @click="cleanQuery"></i>
  </div>
</template>
<script>
import { fucTimeOut } from 'common/js/util'
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    cleanQuery() {
      this.query = ''
    },
    setQuery(newQ) {
      this.query = newQ
    }
  },
  created() {
    this.$watch('query', fucTimeOut((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  }
}
</script>
<style lang="stylus">
@import '~common/stylus/variable.styl'
.search-box
  display:flex
  height:40px
  align-items:center
  padding:0 10px
  box-sizing: border-box
  background:$color-highlight-background
  margin:10px
  border-radius: 6px
  .input
    background:$color-highlight-background
    width:100%
    padding:0 5px
    margin:0 5px
    height:35px
    color:$color-text
    font-size: $font-size-medium
    border-style:none
    &::placeholder
      color: $color-text-d
  input:focus
    outline:none
</style>