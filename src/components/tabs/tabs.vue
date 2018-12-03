<template>
  <div class="tabs">
    <router-link
     tag="div"
     to="/recommend"
     class="tab-item"
    >
      <span class="item">推荐</span>
    </router-link>
    <router-link
     tag="div"
     to="/singer"
     class="tab-item"
    >
      <span class="item">歌手</span>
    </router-link>
    <router-link
     tag="div"
     to="/rank"
     class="tab-item"
    >
      <span class="item">排行</span>
    </router-link>
    <router-link
     tag="div"
     to="/search"
     class="tab-item"
    >
      <span class="item">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'tabs'
}
</script>
<style lang="stylus">
.tabs
  display:flex
  height:44px
  justify-content:space-between
  .tab-item
    text-align:center
    width:25%
  .router-link-active .item
    color:red
    border-bottom:2px solid red
    width:20px
</style>
