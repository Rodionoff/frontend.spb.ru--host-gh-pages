class LazyLoad {
  constructor () {
    this.loadedPages = []
    this.load = this.load.bind(this)
  }

  load(pathname) {
    const images = document.querySelectorAll('.lazyloading-wrapper images')
    const placeholders = document.querySelectorAll('.lazyloading-wrapper .sqip-placeholder')
    if (images.length === 0) return
    const loadedImages = []
    images.forEach((image, i) => {
      const temp = new Image()
      temp.onload = () => {
        image.src = temp.src
        const placeholder = placeholders[i]
        placeholder.classList.add('fade-away')
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

