class LazyLoad {
  constructor () {
    this.loadedPages = []
    this.load = this.load.bind(this)
  }

  load() {
    console.log({ loadPages: this.loadedPages})
    const pathname = location.pathname
    const isLoaded = this.loadedPages.includes(pathname)
    if (isLoaded) return document.body.classList.add('pageLoaded')
    // if (document.body.classList.contains('pageLoaded')) document.body.classList.remove('pageLoaded')
    this.images = document.querySelectorAll('img.lazyloading.with-placeholder')
    this.loadedImages = []
    this.images.forEach(image => {
      const temp = new Image()
      temp.onload = () => {
        image.src = temp.src
        this.loadedImages.push(image)
        if (this.loadedImages.length === this.images.length) {
          this.loadedPages.push(pathname)
        }
      }
      temp.src = image.dataset.src
    })
  }
}

export default new LazyLoad()

