function randomNum(max) {
  return Math.floor(Math.random() * max)
}

export function randomList(arr) {
  let arrc = arr
  let arrlen = arrc.length
  for (let i = 0; i < arrlen; i++) {
    let rNum = randomNum(arrlen)
    let t = arrc[i]
    arrc[i] = arrc[rNum]
    arrc[rNum] = t
  }
  return arrc
}

export function fucTimeOut(fuc, time) {
  let timer
  //  函数柯里化
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fuc.apply(this, args)
    }, time)
  }
}