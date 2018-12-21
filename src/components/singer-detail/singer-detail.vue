<template>
  <transition name="slide">
    <div class="singer-detail">11111111111111111111111111111111111111111111111111111111111111111111</div>
  </transition>
</template>
<script>
export default {
  created (){
    console.log(111)
  }
}
</script>
<style lang="stylus" scoped>
.singer-detail
  position: absolute
  top: 88px
  bottom: 0
  left:0
  right:0
  background: red
  z-index: 99
.slide-enter-active, .slide-leave-active
  transition: all 0.2s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

</style>