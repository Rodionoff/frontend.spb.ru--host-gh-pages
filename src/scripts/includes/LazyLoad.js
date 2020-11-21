class LazyLoad {
  constructor () {
    this.loadedPages = []
    this.load = this.load.bind(this)
  }

  load({ container, pathname }) {
    let images
    if (container) {
      images = container.querySelectorAll('img.lazyloading.with-placeholder')
    } else {
      images = document.querySelectorAll('img.lazyloading.with-placeholder')
    }
    if (images.length === 0) return
    const loadedImages = []
    images.forEach(image => {
      const temp = new Image()
      temp.onload = () => {
        image.src = temp.src
        loadedImages.push(image)
        if (loadedImages.length === images.length) {
          this.loadedPages.push(pathname)
        }
      }
      temp.src = image.dataset.src
    })
  }
}

export default new LazyLoad()

