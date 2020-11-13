import { krooshkinPhotosLoadedEvent } from './lazyLoad'

class Carousel {
  constructor () {
    this.initializeControls()

    window.addEventListener('click', (event) => {
      const target = event.target

      if (target.tagName === 'IMG') {
        const parent = target.closest('.photo-image')
        const index = [...this.images].indexOf(parent)
        this.showModal(index)
      }
    })

    window.addEventListener(krooshkinPhotosLoadedEvent.type, _ => {
      // replace placeholders
      this.images = document.querySelectorAll('.photo-image')
    })

    this.bindEventsToControls()
  }

  initializeControls() {
    this.modal = document.querySelector('.modal')
    this.images = document.querySelectorAll('.photo-image')
    this.exit = document.createElement('div')
    this.exit.classList.add('exit')
    this.exit.innerHTML = '⌧'
    this.leftArrow = this.createArrow('div', 'leftArrow', '⌦')
    this.rightArrow = this.createArrow('div', 'rightArrow', '⌦')
  }

  createArrow (elementName, className, sign) {
    let arrow = document.createElement(elementName)
    arrow.classList.add('arrow')
    arrow.classList.add(className)
    arrow.innerHTML = sign
    return arrow
  }

  showModal(i) {
    let img = document.createElement('img')
    img.classList.add('modalImage')

    this.leftArrow.style.visibility = 'visible'
    this.rightArrow.style.visibility = 'visible'
    img.pk = i
    img.src = this.images[i].querySelector('img').src
    this.appendElementsToModal(img)
    this.modal.classList.add('showModal')
  }

  appendElementsToModal(img) {
    this.modal.appendChild(this.exit)
    this.modal.appendChild(this.leftArrow)
    this.modal.appendChild(img)
    this.modal.appendChild(this.rightArrow)
  }

  bindEventsToControls() {
    this.rightArrow.onclick = () => {
      this.leftArrow.style.visibility = 'visible'
      let image = document.querySelector('.modalImage')
      image.pk += 1
      let isLastImage = this.images[image.pk] === undefined

      if (isLastImage) {
        image.pk = 0
      }
      image.src = this.images[image.pk].querySelector('img').src
    }

    this.leftArrow.onclick = () => {
      this.rightArrow.style.visibility = 'visible'
      let image = document.querySelector('.modalImage')
      image.pk -= 1
      let isFirstImage = this.images[image.pk] === undefined

      if (isFirstImage) {
        image.pk = this.images.length - 1
      }
      image.src = this.images[image.pk].querySelector('img').src
    }

    this.exit.onclick = () => {
      let image = document.querySelector('.modalImage')
      this.modal.removeChild(image)
      this.leftArrow.style.visibility = 'hidden'
      this.rightArrow.style.visibility = 'hidden'
      this.modal.classList.remove('showModal')
    }
  }

  refresh() {
    this.initializeControls()
    this.bindEventsToControls()
  }
}

export default new Carousel()
