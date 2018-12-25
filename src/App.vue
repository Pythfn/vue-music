<template>
  <div id="app">
    <m-header></m-header>
    <m-tabs></m-tabs>
    <keep-alive>
      <router-view />
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from './components/m-header/m-header'
import MTabs from './components/tabs/tabs'
import player from './components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    MTabs,
    player
  }
}

</script>
<style lang="stylus">
</style>
