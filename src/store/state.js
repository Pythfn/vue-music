import { playModeType } from 'common/js/config.js'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  playMode: playModeType.sequence,
  currentIndex: -1,
  discId: {},
  topId:{}
}

export default state