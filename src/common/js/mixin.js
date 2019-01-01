import { mapGetters } from 'vuex'

export const playerMixin = {
  computed: {
    PLAYER_HEIGHT() {
      return '60px'
    },
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.setPlayerHeightMixin(this.playList)
  },
  activated() {
    this.setPlayerHeightMixin(this.playList)
  },
  watch: {
    playList(newVal) {
      this.setPlayerHeightMixin(newVal)
    }
  },
  methods: {
    setPlayerHeightMixin() {
      throw new Error('需要定义player高度方法')
    }
  }
}
