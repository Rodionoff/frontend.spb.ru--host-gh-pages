// <p class="footer__timestamp">
//   2018 - 2019
//   </p>

class UpdateFooterYear {
  constructor () {
    this.timestamps = document.querySelectorAll('.footer .footer__timestamp')
    this.currentYear = new Date().getFullYear()
    this.currentYearString = `2018 - ${this.currentYear}`
    this.updateYear = this.updateYear.bind(this)
    this.updateYear()
  }

  updateYear() {
    this.timestamps.forEach(timestamp => {
      if (timestamp) {
        const needUpdate = timestamp.innerHTML !== this.currentYearString
        if (needUpdate) {
          timestamp.innerHTML = this.currentYearString
        }
      }
    })
  }
}

export default () => new UpdateFooterYear().updateYear