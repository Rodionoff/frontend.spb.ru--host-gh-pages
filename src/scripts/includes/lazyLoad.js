const krooshkinPhotosLoadedEvent = new CustomEvent('krooshkinPhotosLoaded')

class LazyLoad {
  constructor () {
    this.loadedPages = []
  }

  load() {
    const pathname = location.pathname
    const isLoaded = this.loadedPages.includes(pathname)
    if (isLoaded) return document.body.classList.add('pageLoaded')
    if (document.body.classList.contains('pageLoaded')) document.body.classList.remove('pageLoaded')
    this.images = document.querySelectorAll('.photo-image img.with-placeholder')
    this.loadedImages = []
    this.images.forEach(image => {
      const temp = new Image()
      temp.onload = () => {
        image.src = temp.src
        this.loadedImages.push(image)
        if (this.loadedImages.length === this.images.length) {
          this.loadedPages.push(pathname)
          window.dispatchEvent(krooshkinPhotosLoadedEvent)
        }
      }
      temp.src = image.dataset.src
    })
  }
}

const lazy = new LazyLoad()
module.exports = {
  krooshkinPhotosLoadedEvent,
  lazy
}

