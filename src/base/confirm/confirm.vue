<template>
  <div class="confirm" v-show="show">
    <div class="confirm-box">
      <div class="confirm-window" v-show="show">
        <div class="title">
          {{ title }}
        </div>
        <div class="option">
          <div class="no" @click.stop="selectNo">
            <span>{{ no }}</span>
          </div>
          <div class="yes" @click.stop="selectYes">
            <span>{{ yes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '是否确认'
    },
    yes: {
      type: String,
      default: '确认'
    },
    no: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    isShow() {
      this.show = true
    },
    isHide() {
      this.show = false
    },
    selectNo() {
      this.$emit('selectNo')
    },
    selectYes() {
      this.$emit('selectYes')
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.confirm
  position:fixed
  top:0
  left:0
  right:0
  bottom:0
  z-index:998
  background:rgba(0,0,0,0.2)
  .confirm-box
    position:absolute
    top:50%
    left:50%
    transform:translate(-50%,-50%)
    .confirm-window
      text-align:center
      background:$color-background
      border-radius:10px
      width:200px
      height:80px
      .title
        padding:13px 0
        border-bottom:1px solid gray
      .option
        display:flex
        justify-content:center
        .no
          flex:1
          background:rgba(0,0,0,0.2)
          padding:10px 20px
          border-right:1px solid gray
        .yes
          flex:1
          background:rgba(0,0,0,0.2)
          padding:10px 20px
</style>