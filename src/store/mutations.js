import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state, data) {
    state.playList = data
  },
  [types.SET_SEQUENCE_LIST](state, data) {
    state.sequenceList = data
  },
  [types.SET_PLAY_MODE](state, data) {
    state.playMode = data
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISCID](state, index) {
    state.discId = index
  },
  [types.SET_TOPID](state, index) {
    state.topId = index
  },
  [types.SET_SEARCH_HISTORY](state, data) {
    state.searchHistory = data
  }
}

export default mutations