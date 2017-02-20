  const fftJS = require('fft-js')
  const CircularBuffer = require('./circularBuffer')
  const fft = fftJS.fft
  const fftUtil = fftJS.util
  const Chart = require('chart.js')

  class HRController {

    constructor(socket, frameRate) {
      this.socket = socket.socket
      this.frameRate = frameRate
      let size = 512
      this.circularBufferRed = new CircularBuffer(size)
      this.circularBufferGreen = new CircularBuffer(size)
      this.circularBufferBlue = new CircularBuffer(size)
      setInterval(this.calculateHR.bind(this), 1000)
      this.ctx = document.getElementById('chartCanvas')
      this.ctx2 = document.getElementById('chartCanvas2')
      this.ctx3 = document.getElementById('chartCanvas3')
      this.p = document.getElementById('hr')
      Chart.defaults.global.maintainAspectRatio = true
      Chart.defaults.global.responsive = false

    }

    setAverage(r, g, b) {
      this.circularBufferRed.push(r)
      this.circularBufferGreen.push(g)
      this.circularBufferBlue.push(b)
    }

    calculateHR() {
      if (this.circularBufferGreen.isBufferFull()) {
        let hr = {
          // red: this.calculatefft(this.circularBufferRed.getBuffer(), 'r') * 60,
          green: this.calculatefft(this.circularBufferGreen.getBuffer(), 'g') * 60
            // , blue: this.calculatefft(this.circularBufferBlue.getBuffer(), 'b') * 60
        }
        console.log(hr)
          // this.p.innerText = 'red : ' + hr.red + ' green : ' + hr.green + ' blue : ' + hr.blue
        this.p.innerText = 'hr : ' + hr.green

        return hr
      } else {
        return null
      }
    }

    drawGraph(context, data, color) {
      context.width = 300
      context.height = 200
      this.chartInstance = new Chart(context, {
        type: 'line'
        , data: {
          datasets: [{
            label: color + ' ftt'
            , data: data.slice(3, data.length)
          }]
        }
        , options: {
          scales: {
            xAxes: [{
              type: 'linear'
              , position: 'bottom'
            }]
          }
        }
      })
    }

    calculatefft(buffer, color) {
      let phasors = fft(buffer)
        // Sample rate and coef is just used for length, and frequency step
      let frequencies = fftUtil.fftFreq(phasors, this.frameRate)
      let magnitudes = fftUtil.fftMag(phasors)

      var both = frequencies.map(function (f, m) {
        return { frequency: f, magnitude: magnitudes[m] }
      })

      var graf = both.map(function (b) {
        return { x: b.frequency, y: b.magnitude }
      })

      // if (color === 'r') {
      //   this.drawGraph(this.ctx, graf, color)
      // } else if (color === 'g') {
      this.drawGraph(this.ctx2, graf, color)
        // } else {
        //   this.drawGraph(this.ctx3, graf, color)
        // }

      both.sort(function (a, b) {
        return parseFloat(b.magnitude) - parseFloat(a.magnitude)
      })

      return this.getFrequency(both)
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
