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
      imageAnalyser.rgb = { red: [2, 2, 2, 2] }
      imageAnalyser.calculateMeans()
      assert.equal(hrController.redAverage, 2, 'average not being set correctly or calculated')
      done()
    })

    it('should split channels', (done) => {
      imageAnalyser.rgb = { red: [2, 2, 2, 2] }
      hrController.redAverage = 100
      imageAnalyser.calculateMeans()
      assert.equal(hrController.redAverage, 0, 'average not being set correctly or calculated')
      done()
    })
  })
})
