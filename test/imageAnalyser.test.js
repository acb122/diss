const assert = require('assert')
  , ImageAnalyser = require('../app/assets/js/imageAnalyser')
  , HRController = require('../app/assets/js/hrController')

describe('ImageAnalyser', () => {

  let imageAnalyser
    , hrController
  beforeEach((done) => {
    hrController = new HRController('')
    imageAnalyser = new ImageAnalyser(hrController, 2, '')
    done()
  })

  describe('processImage', () => {
    it('should return underfined if passed undefined', (done) => {
      let imgData = imageAnalyser.processImage(undefined)
      assert.equal(imgData, undefined, 'not returning undefined')
      done()
    })

    it('should split channels', (done) => {
      let data = {}
      data.data = [1, 1, 3, 1, 1, 2, 3, 1, 1, 3, 3, 1, 1, 3, 3, 1]
      let imgData = imageAnalyser.processImage(data)
      assert.deepEqual(imgData.red, [1, 1, 1, 1], 'not returning correct data')
      assert.deepEqual(imgData.green, [1, 2, 3, 3], 'not returning correct data')
      assert.deepEqual(imgData.blue, [3, 3, 3, 3], 'not returning correct data')
      done()
    })
  })

  describe('calculateMeans', () => {
    it('should return average', (done) => {
      imageAnalyser.rgb = { red: [2, 2, 2, 2], green: [2, 2, 2, 2], blue: [2, 2, 2, 2] }
      imageAnalyser.calculateMeans()
      assert.equal(hrController.circularBuffer.getBuffer(), 2, 'average not being set correctly or calculated')
      done()
    })

    it('should return average ignore weird value', (done) => {
      imageAnalyser.rgb = {
        red: [2, 2, 2, 2, 2, 2, 2, 2]
        , green: [2, 2, 2, 250, 2, 2, 2, 2]
        , blue: [2, 2, 2, 2, 2, 2, 2, 2]
      }
      imageAnalyser.calculateMeans()
      assert.equal(hrController.circularBuffer.getBuffer(), 2, 'average not being set correctly or calculated')
      done()
    })
  })
})
