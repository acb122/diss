const assert = require('assert')
  , HRController = require('../app/assets/js/hrController')

describe('HRController', () => {

  let hrController
  beforeEach((done) => {
    hrController = new HRController('')
    done()
  })

  describe('getCurrentAverage', () => {
    it('should return 0 if passed in alpha', (done) => {
      let average = hrController.getCurrentAverage('alpha')
      assert.equal(average, 0, 'not returning 0')
      done()
    })

    it('should pass correct value', (done) => {
      hrController.redAverage = 10
      hrController.greenAverage = 10
      hrController.blueAverage = 10
      let average = hrController.getCurrentAverage('red')
      let average2 = hrController.getCurrentAverage('green')
      let average3 = hrController.getCurrentAverage('blue')
      assert.equal(average, 10, 'not returning 0')
      assert.equal(average2, 10, 'not returning 0')
      assert.equal(average3, 10, 'not returning 0')
      done()
    })
  })

  describe('setCurrentAverage', () => {
    it('should set values', (done) => {
      hrController.setCurrentAverage('red', 5)
      hrController.setCurrentAverage('green', 15)
      hrController.setCurrentAverage('blue', 25)
      assert.equal(hrController.redAverage, 5, 'not setting value correct')
      assert.equal(hrController.greenAverage, 15, 'not setting value correct')
      assert.equal(hrController.blueAverage, 25, 'not setting value correct')
      done()
    })

    it('should not change value', (done) => {
      hrController.setCurrentAverage('alpha', 5)
      assert.equal(hrController.redAverage, 0, 'should not change value it has')
      assert.equal(hrController.greenAverage, 0, 'should not change value it has')
      assert.equal(hrController.blueAverage, 0, 'should not change value it has')
      done()
    })
  })
})
