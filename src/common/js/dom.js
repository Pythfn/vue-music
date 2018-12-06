export function addClass (el, addclassname) {
  if (findClass(el, addclassname)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(addclassname)
  el.className = newClass.join(' ')
}

export function findClass (el, findclassname) {
  let reg = new RegExp('(^|\\s)' + findclassname + '(\\s|$)')
  return reg.test(el.className)
}
