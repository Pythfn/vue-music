export const getSinger = state => state.singer

//  播放状态
export const playing = state => state.playing
//  播放器全屏状态
export const fullScreen = state => state.fullScreen
//  播放列表
export const playList = state => state.playList
//  顺序列表
export const sequenceList = state => state.sequenceList
//  播放模式
export const playMode = state => state.playMode
//  当前播放角标
export const currentIndex = state => state.currentIndex
//  当前播放歌曲，不存在则返回空对象
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
