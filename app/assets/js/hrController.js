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
      this.circularBuffer = new CircularBuffer(512)
      setInterval(this.temp.bind(this), 1000)
    }

    getCurrentAverage(key) {
      switch (key) {
        case 'red':
          return this.redAverage
        case 'green':
          return this.greenAverage
        case 'blue':
          return this.blueAverage
        default:
          return 0
      }
    }

    setCurrentAverage(key, value) {
      switch (key) {
        case 'red':
          this.redAverage = value
          break
        case 'green':
          this.greenAverage = value
          this.circularBuffer.push(value)
          break
        case 'blue':
          this.blueAverage = value
          break
        default:
          break
      }
    }

    temp() {
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

        let freq = this.getFrequency(both)

        console.log('your heart rate:' + (freq * 60))

      }
    }

    getFrequency(both) {
      let freq
      let counter = 0
      while (!freq) {
        if (both[counter].frequency > 0.8 && both[counter].frequency < 4.0) {
          freq = both[counter].frequency
        }
        counter++
      }

      return freq
    }
  }

  module.exports = HRController
