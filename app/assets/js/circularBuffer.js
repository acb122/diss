class CircularBuffer {

  constructor(maxSize) {
    this.maxSize = maxSize
    this.buffer = new Array(maxSize)
    this.size = 0
  }

  push(value) {
    if (this.size === 0) {
      this.buffer[0] = value
      this.size++
    } else {
      this.buffer[this.size % this.maxSize] = value
      this.size++
    }
  }

  getBuffer() {
    let p1
      , p2
    if (this.size === 0) {
      return []
    }
    if (this.size >= this.maxSize) {
      p1 = this.buffer.slice((this.size % this.maxSize), this.maxSize)
      p2 = this.buffer.slice(0, (this.size % this.maxSize))
      return p1.concat(p2)
    } else {
      p1 = this.buffer.slice(0, this.size)
      return p1
    }
  }
}
module.exports = CircularBuffer
