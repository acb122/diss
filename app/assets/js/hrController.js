  const fftJS = require('fft-js')
  const CircularBuffer = require('./circularBuffer')
  const fft = fftJS.fft
  const fftUtil = fftJS.util

  class HRController {

    constructor(socket) {
      this.socket = socket.socket
      this.redAverage = 0
      this.greenAverage = 0
      this.blueAverage = 0
      this.circularBuffer = new CircularBuffer(64)
      setInterval(this.calculateHR.bind(this), 1000)

    }

    // change to r g b
    setAverage(r, b, g) {
      this.circularBuffer.push(g)
    }

    calculateHR() {
      let freq = this.calculatefft()
      console.log('your heart rate:' + (freq * 60))
      return freq * 60
    }

    calculatefft() {
      console.log(this.circularBuffer.isBufferFull())

      if (this.circularBuffer.isBufferFull()) {

        let phasors = fft(this.circularBuffer.getBuffer())
          // Sample rate and coef is just used for length, and frequency step
        let frequencies = fftUtil.fftFreq(phasors, 15)
        let magnitudes = fftUtil.fftMag(phasors)

        var both = frequencies.map(function (f, m) {
          return { frequency: f, magnitude: magnitudes[m] }
        })

        both.sort(function (a, b) {
          return parseFloat(b.magnitude) - parseFloat(a.magnitude)
        })

        return this.getFrequency(both)

      }
    }

    getFrequency(both) {
      let freq
      let counter = 0
      while (!freq && both.length > counter) {
        if (both[counter].frequency > 0.8 && both[counter].frequency < 4.0) {
          freq = both[counter].frequency
        }
        counter++
      }

      return freq
    }
  }

  module.exports = HRController
