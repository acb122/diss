const assert = require('assert')
  , Actions = require('../app/assets/js/actions')

describe('Action', () => {

  let actions
  beforeEach((done) => {
    actions = new Actions('')
    done()
  })

  function setupHTML() {
    var video = document.createElement('VIDEO') // Create a <button> element
    video.id = 'video'
    document.body.appendChild(video)
    var canvas = document.createElement('CANVAS') // Create a <button> element
    canvas.id = 'overlay'
    document.body.appendChild(canvas)
    var canvas2 = document.createElement('CANVAS') // Create a <button> element
    canvas2.id = 'overlay2'
    document.body.appendChild(canvas2)
  }

  function makePositions(a, b, c, d, e, f, g) {
    let positions = []
    positions[15] = [a, 0]
    positions[39] = [b, 0]
    positions[31] = [0, b]
    positions[38] = [0, c]
    positions[35] = [d, 0]
    positions[19] = [e, 0]
    positions[26] = [0, f]
    positions[36] = [0, g]
    return positions
  }

  describe('stream', () => {
    it('make sure no error', (done) => {
      setupHTML()
      window.navigator.getUserMedia = function (opt, ok, err) {
        ok('')
        err.err = 'no error'
      }
      window.URL.createObjectURL = function (input) {
        return input
      }

      actions.stream()
      done()
    })

    it('make sure error', (done) => {
      setupHTML()
      window.navigator.getUserMedia = function (opt, test, ok) {
        ok('')
      }
      window.URL.createObjectURL = function (input) {
        return input
      }

      actions.stream()
      done()
    })
  })

  describe('loop', () => {
    it('test the whole class', (done) => {
      actions.facetracker = []
      actions.overlayContext = []
      actions.overlay2Context = []
      actions.facetracker.getCurrentPosition = function () {
        return makePositions(4, 2, 4, 100, 200, 200, 100)
      }
      actions.facetracker.draw = function () {
        return
      }
      actions.overlay2Context.clearRect = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.overlayContext.drawImage = function (v, t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.overlay2Context.strokeRect = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.overlayContext.getImageData = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.loop()
      done()
    })

    it('test no face', (done) => {
      actions.facetracker = []
      actions.overlayContext = []
      actions.overlay2Context = []
      actions.facetracker.getCurrentPosition = function () {
        return null
      }
      actions.facetracker.draw = function () {
        return
      }
      actions.overlay2Context.clearRect = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.overlayContext.strokeRect = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.overlayContext.getImageData = function (t, t2, t3, t4) {
        t4.why = null
        return
      }
      actions.loop()
      done()
    })
  })

  describe('pickBox', () => {
    it('should return underfined if passed undefined', (done) => {
      let box = actions.pickBox(undefined)
      assert.equal(box, undefined, 'not returning undefined')
      done()
    })

    it('should return first box', (done) => {
      let positions = makePositions(40, 20, 40, 4, 2, 2, 4)
      let box = actions.pickBox(positions)
      assert.equal(box.l, 20, 'correct box not picked')
      done()
    })

    it('should return second box', (done) => {
      let positions = makePositions(4, 2, 4, 100, 200, 200, 100)
      let box = actions.pickBox(positions)
      assert.equal(box.l, 200, 'correct box not picked')
      done()
    })

    it('should return second box', (done) => {
      let positions = makePositions(4, 2, 4, 4, 2, 4, 2)
      let box = actions.pickBox(positions)
      assert.equal(box.l, 2, 'correct box not picked')
      done()
    })
  })

})
