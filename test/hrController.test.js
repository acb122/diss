const assert = require('assert')
  , HRController = require('../app/assets/js/hrController')
  , CircularBuffer = require('../app/assets/js/circularBuffer')

describe('HRController', () => {

  let hrController
  beforeEach((done) => {
    hrController = new HRController('', 15)
    done()
  })

  function setupHTML() {
    var p = document.createElement('P') // Create a <button> element
    p.id = 'hr'
    return p
  }

  describe('setCurrentAverage', () => {
    it('should set values', (done) => {
      hrController.setAverage(5, 15, 25)
      assert.deepEqual(hrController.circularBufferGreen.getBuffer(), [15], 'not setting value correct')
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
      hrController.drawGraph = function () {}
      let p = setupHTML()
      hrController.p = p
      hrController.circularBufferGreen = new CircularBuffer(4)
      hrController.circularBufferGreen.push(1)
      hrController.circularBufferGreen.push(0)
      hrController.circularBufferGreen.push(1)
      hrController.circularBufferGreen.push(0)
      let hr = hrController.calculateHR()
      assert.equal(hr.green, 225, 'not setting value correct')
      done()
    })

    it('should return null', (done) => {
      hrController.drawGraph = function () {}
      let p = setupHTML()
      hrController.p = p
      hrController.circularBufferGreen = new CircularBuffer(4)
      let hr = hrController.calculateHR()
      assert.equal(hr, null, 'not setting value correct')
      done()
    })
  })

  describe('drawGraph', () => {
    it('should return HR', (done) => {
      let p = setupHTML()
      let data = [{ x: 3, y: 0.1 }]
      hrController.drawGraph(p, data, 'r')
      done()
    })
  })

})
