import storage from 'good-storage'

const SEARCH = '__search__'
const MAX_SEARCH = 30

export const saveSearch = function(query) {
  //  获取storage的search值，无则返回空数组
  let searchH = storage.get(SEARCH, [])
  if (!query) {
    return searchH
  }
  //  查找搜索历史里是否有新插入的歌曲
  let oindex = searchH.findIndex((item) => {
    return item === query
  })
  if (oindex === 0) {
    return
  } else if (oindex === -1) {
    searchH.unshift(query)
  } else if (oindex > 0) {
    searchH.splice(oindex, 1)
    searchH.unshift(query)
  }
  if (searchH.length > MAX_SEARCH) {
    searchH.splice(MAX_SEARCH + 1, searchH.length - MAX_SEARCH)
  }
  storage.set(SEARCH, searchH)
  return searchH
}

export const removeSearch = function(query) {
  let searchH = storage.get(SEARCH, [])
  if (!searchH.length) {
    return
  }
  let findex = searchH.findIndex((item) => {
    return item === query
  })
  searchH.splice(findex, 1)
  storage.set(SEARCH, searchH)
  return searchH
}

export const clearSearch = function() {
  let searchH = []
  storage.set(SEARCH, searchH)
  return searchH
}
