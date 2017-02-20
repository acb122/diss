const assert = require('assert')
  , HRController = require('../app/assets/js/hrController')

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
})
