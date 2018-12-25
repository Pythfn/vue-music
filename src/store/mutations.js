import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.PLAYING](state, flag) {
    state.playing = flag
  },
  [types.FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.PLAY_LIST](state, data) {
    state.playList = data
  },
  [types.SEQUENCE_LIST](state, data) {
    state.sequenceList = data
  },
  [types.PLAY_MODE](state, data) {
    state.playMode = data
  },
  [types.CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations