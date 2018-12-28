function randomNum(max) {
  return Math.floor(Math.random() * max)
}

export function randomList(arr) {
  let arrc = arr
  let arrlen = arrc.length
  for (let i = 0; i < arrlen; i++) {
    let rNum = randomNum(arrlen)
    let t = arrc[i];
    arrc[i] = arrc[rNum]
    arrc[rNum] = t
  }
  return arrc
}
