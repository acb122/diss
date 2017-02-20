const assert = require('assert')
  , HRController = require('../app/assets/js/hrController')
  , CircularBuffer = require('../app/assets/js/circularBuffer')

describe('HRController', () => {

  let hrController
  beforeEach((done) => {
    hrController = new HRController('')
    done()
  })

  describe('setCurrentAverage', () => {
    it('should set values', (done) => {
      hrController.setAverage(5, 15, 25)
      assert.deepEqual(hrController.circularBuffer.getBuffer(), [25], 'not setting value correct')
      done()
    })
  })

  describe('getFrequency', () => {
    it('should set values', (done) => {
      let both = [{ magnitude: 3, frequency: 3 }]
      let freq = hrController.getFrequency(both)
      assert.deepEqual(freq, 3, 'not setting value correct')
      done()
    })

    it('should set values', (done) => {
      let both = [{ magnitude: 10, frequency: 30 }, { magnitude: 3, frequency: 0.3 }, { magnitude: 1, frequency: 3 }]
      let freq = hrController.getFrequency(both)
      assert.deepEqual(freq, 3, 'not setting value correct')
      done()
    })

    it('should set values', (done) => {
      let both = [{ magnitude: 3, frequency: 0.1 }]
      let freq = hrController.getFrequency(both)
      assert.deepEqual(freq, undefined, 'not setting value correct')
      done()
    })

  })

  describe('calculateHR', () => {
    it('should return HR', (done) => {
      hrController.circularBuffer = new CircularBuffer(4)
      hrController.circularBuffer.push(1)
      hrController.circularBuffer.push(0)
      hrController.circularBuffer.push(1)
      hrController.circularBuffer.push(0)
      let hr = hrController.calculateHR()
      assert.equal(hr, 225, 'not setting value correct')
      done()
    })
  })
})
