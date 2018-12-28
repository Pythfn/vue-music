import * as types from './mutation-types'

//  解构赋值出action的commit 和 state方法
export const startPlay = function ({commit, state}, {data, index}) {
  commit(types.SET_PLAY_LIST, data)
  commit(types.SET_SEQUENCE_LIST, data)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
}