import storage from 'good-storage'

const SEARCH = '__search__'

export const saveSearch = function(query) {
  //  获取storage的search值，无则返回空数组
  let searchH = storage.get(SEARCH, [])
  let oindex = searchH.findIndex((index) => {
    return index === query
  })
  if (oindex === 0) {
    return
  } else if (oindex === -1) {
    searchH.unshift(query)
  } else if (oindex > 0) {
    searchH.splice(oindex, 1)
    searchH.unshift(query)
  }
  storage.set(SEARCH, searchH)
  return searchH
}