import * as types from './mutation-types'
import { randomList } from 'common/js/util'

//  解构赋值出action的commit 和 state方法
export const startPlay = function({ commit, state }, { data, index }) {
  commit(types.SET_PLAY_LIST, data)
  commit(types.SET_SEQUENCE_LIST, data)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
}

export const setRandomPlay = function({ commit, state }) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let playing = state.playing
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]
  playList = randomList(playList)
  let newIndex = findSongIndex(playList, currentSong)
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_CURRENT_INDEX, newIndex)
  console.log('suijiwancheng')
}


const findSongIndex = function(arr, song) {
  let index = arr.findIndex((value) => {
    return value.id === song.id
  })
  return index
}

export const insterSong = function({ commit, state }, song) {
  //  深拷贝防止对state进行操作
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let playing = state.playing
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]
  let newIndex = 0
  //  相同歌曲的index
  let sameIndex = findSongIndex(playList, song)
  console.log('sameIndex:' + sameIndex)
  if (sameIndex === -1) {
    //  在当前歌曲的后面插入歌曲
    playList.splice(currentIndex + 1, 0, song)
    newIndex = currentIndex + 1
    console.log('newSongindex:' + newIndex)
  } else {
    //  如果找到相同的歌曲，直接跳转到该歌曲
    newIndex = sameIndex
  }
  //  playlist的currentIndex 在随机状态和顺序列表是不一致的
  let cIndex = findSongIndex(sequenceList, currentSong)
  console.log('sequenceListindex:' + cIndex)
  if (sameIndex === -1) {
    sequenceList.splice(cIndex + 1, 0, song)
  } else {
    console.log('已有该歌曲')
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, newIndex)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  console.log(playList)
  console.log(sequenceList)
}
