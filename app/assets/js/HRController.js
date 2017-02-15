class HRController {

  constructor(socket) {
    this.socket = socket.socket
    this.redAverage = 0
    this.greenAverage = 0
    this.blueAverage = 0
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
        break
      case 'blue':
        this.blueAverage = value
        break
      default:
        break
    }
  }

}
module.exports = HRController
