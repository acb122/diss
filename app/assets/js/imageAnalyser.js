class ImageAnalyser {

  constructor(hrController, pixelResolution, imgData) {
    this.hrController = hrController
    this.pixelResolution = pixelResolution
    this.rgb = this.processImage(imgData)
    this.calculateMeans()
  }

  processImage(imgData) {
    if (imgData) {
      let red = []
        , green = []
        , blue = []
        , alpha = []

      for (let x = 0; x < this.pixelResolution * this.pixelResolution; x++) {
        red[x] = imgData.data[0 + (4 * x)]
        green[x] = imgData.data[1 + (4 * x)]
        blue[x] = imgData.data[2 + (4 * x)]
        alpha[x] = imgData.data[3 + (4 * x)]
      }

      return {
        red: red
        , green: green
        , blue: blue
        , alpha: alpha
      }
    } else {
      return undefined
    }
  }

  calculateMeans() {
    for (var key in this.rgb) {
      this.calculateMean(key)
    }
  }

  calculateMean(key) {
    if (key !== 'alpha') {
      let previousAverage = this.hrController.getCurrentAverage(key)
      let average = 0
        , count = 0
      this.rgb[key].forEach((value) => {
        if ((previousAverage - 10 < value && value < previousAverage + 10) || previousAverage === 0) {
          average += value
          count++
        }
      })
      if (count === 0) {
        this.hrController.setCurrentAverage(key, 0)
      } else {
        this.hrController.setCurrentAverage(key, average / count)
      }
    }
  }
}
module.exports = ImageAnalyser
