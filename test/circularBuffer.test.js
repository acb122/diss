const assert = require('assert')
  , CircularBuffer = require('../app/assets/js/circularBuffer')

describe('CircularBuffer', () => {

  let circularBuffer
  beforeEach((done) => {
    circularBuffer = new CircularBuffer(2)
    done()
  })

  describe('push', () => {
    it('should have empty bufer if no push', (done) => {
      assert.deepEqual(circularBuffer.buffer, [], 'not empty')
      done()
    })

    it('should have a single item in', (done) => {
      circularBuffer.push(2)
      assert.deepEqual(circularBuffer.buffer, [2], 'no item added')
      done()
    })

    it('should pass correct value', (done) => {
      for (let x = 1; x <= 6; x++) {
        circularBuffer.push(x)
      }

      assert.deepEqual(circularBuffer.buffer, [5, 6], 'no item added')
      done()
    })
  })

  describe('getBuffer', () => {
    it('should have empty bufer if no push', (done) => {
      assert.deepEqual(circularBuffer.getBuffer(), [], 'not empty')
      done()
    })

    it('should have a single item in', (done) => {
      circularBuffer.push(2)
      assert.deepEqual(circularBuffer.getBuffer(), [2], 'no item added')
      done()
    })

    it('should pass correct value', (done) => {
      for (let x = 1; x <= 6; x++) {
        circularBuffer.push(x)
      }
      assert.deepEqual(circularBuffer.getBuffer(), [5, 6], 'no item added')
      done()
    })

    it('should pass correct value', (done) => {
      circularBuffer = new CircularBuffer(9)
      for (let x = 1; x <= 10; x++) {
        circularBuffer.push(x)
      }
      assert.deepEqual(circularBuffer.getBuffer(), [2, 3, 4, 5, 6, 7, 8, 9, 10], 'no item added')
      done()
    })
  })
  describe('isBufferFull', () => {
    it('should return false when buffer not full', (done) => {
      circularBuffer.push(1)
      assert.equal(circularBuffer.isBufferFull(), false)
      done()
    })

    it('should return true if full ', (done) => {
      circularBuffer.push(1)
      circularBuffer.push(2)

      assert.equal(circularBuffer.isBufferFull(), true)
      done()
    })

    it('should return true if full ', (done) => {
      for (let x = 1; x <= 10; x++) {
        circularBuffer.push(x)
      }
      assert.equal(circularBuffer.isBufferFull(), true)
      done()
    })
  })
})
