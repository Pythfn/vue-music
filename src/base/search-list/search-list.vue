<template>
  <div class="search-list">
    <ul>
      <li
       v-for="(item, index) in searchlist"
       class="search-Item"
       :key="index"
      >
        <span class="item-text" @click="selectItem(item)">{{ item }}</span>
        <i class="icon-delete" @click="removeItem(item)"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    searchlist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item)
    },
    removeItem(item) {
      this.$emit('removeItem', item)
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.search-list
  margin:20px
  .search-Item
    display:flex
    color:$color-text-l
    padding-bottom:10px
    .item-text
      flex:1
</style>