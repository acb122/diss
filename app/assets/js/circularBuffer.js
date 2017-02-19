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
      let index = this.size % this.maxSize
      this.buffer[index] = value
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

  isBufferFull() {
    if (this.maxSize < this.size) {
      return true
    }
    return false
  }
}

module.exports = CircularBuffer
