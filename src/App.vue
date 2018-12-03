<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <router-view />
  </div>
</template>
<script>
import MHeader from './components/m-header/m-header'
import MTabs from './components/tabs/tabs'
export default {
  name: 'App',
  components: {
    MHeader,
    MTabs
  }
}

</script>
<style lang="stylus">

</style>
