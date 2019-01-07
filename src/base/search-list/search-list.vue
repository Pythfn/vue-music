<template>
  <div class="search-list">
    <ul>
      <li v-for="item in searchlist">
        <span>{{ item }}</span>
        <i class="icon-delete"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    searchlist: {
      type: Array,
      default: [12,3]
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>