export default class Singer {
  constructor(id, name, findex) {
    this.id = id
    this.name = name
    this.key = findex
    this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}