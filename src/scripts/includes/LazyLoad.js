import { imageLoadedEvent } from './events'

class LazyLoad {
  constructor () {
    this.loadedPages = []
    this.load = this.load.bind(this)
  }

  load(pathname) {
    const images = document.querySelectorAll('.lazyloading-wrapper img.not-a-placeholder')
    if (images.length === 0) return
    const loadedImages = []
    images.forEach((image) => {
      const temp = new Image()
      temp.onload = () => {
        loadedImages.push(image)
        const parent = image.closest('.lazyloading-wrapper')
        const placeholder = parent.querySelector('img.placeholder')
        placeholder && placeholder.classList.add('fade-out')
        const computedTime = getComputedStyle(placeholder).getPropertyValue('--transition-time')
        const transitionTime = parseFloat(computedTime)
        setTimeout(() => {
          placeholder.src = temp.src
          window.dispatchEvent(imageLoadedEvent)
        }, transitionTime)
        if (loadedImages.length === images.length) {
          this.loadedPages.push(pathname)
        }
      }
      temp.src = image.src
    })
  }
}

export default new LazyLoad()

