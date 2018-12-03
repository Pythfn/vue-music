<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="apptitle">Alex Music</div>
  </div>
</template>
<script>
export default {}

</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    width:100%
    text-align:center
    .apptitle
      display:inline-block
      vertical-align:top
      line-height:30px
      margin-left:5px
    .icon
      display:inline-block
      width:30px
      height:32px
      bg-image('logo')
      background-size:30px 32px
</style>
