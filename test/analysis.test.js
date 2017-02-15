const assert = require('assert')
  , Analysis = require('../app/assets/js/analysis')

describe('Action', () => {

  let actions
  beforeEach((done) => {
    actions = new Analysis('')
    done()
  })

  describe('processImage', () => {
    it('should return underfined if passed undefined', (done) => {
      let imgData = actions.processImage(undefined)
      assert.equal(imgData, undefined, 'not returning undefined')
      done()
    })

    it('should split channels', (done) => {
      actions.pixelResolution = 2
      let data = {}
      data.data = [1, 1, 3, 1, 1, 2, 3, 1, 1, 3, 3, 1, 1, 3, 3, 1]
      let imgData = actions.processImage(data)
      assert.deepEqual(imgData.red, [1, 1, 1, 1], 'not returning correct data')
      assert.deepEqual(imgData.green, [1, 2, 3, 3], 'not returning correct data')
      assert.deepEqual(imgData.blue, [3, 3, 3, 3], 'not returning correct data')
      done()
    })
  })
})
