class LazyLoad {
  constructor () {
    this.loadedPages = []
    this.load = this.load.bind(this)
  }

  load(pathname) {
    const images = document.querySelectorAll('.lazyloading-wrapper img')
    if (images.length === 0) return
    const loadedImages = []
    images.forEach((image, i) => {
      const temp = new Image()
      temp.onload = () => {
        const parent = image.closest('.lazyloading-wrapper')
        const placeholder = parent.querySelector('.sqip-placeholder')
        placeholder && placeholder.classList.add('fade-away')
        loadedImages.push(image)
        if (loadedImages.length === images.length) {
          document.body.classList.add('pageLoaded')
          this.loadedPages.push(pathname)
        }
      }
      temp.src = image.src
    })
  }
}

export default new LazyLoad()

