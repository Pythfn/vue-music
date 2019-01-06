import * as types from './mutation-types'

//  解构赋值出action的commit 和 state方法
export const startPlay = function ({commit, state}, {data, index}) {
  commit(types.SET_PLAY_LIST, data)
  commit(types.SET_SEQUENCE_LIST, data)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
}

export const insterSong = function ({commit, state}, song) {
  //  深拷贝防止对state进行操作
  let playList = state.playList.slice()
  playList.push(song)
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, playList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
}