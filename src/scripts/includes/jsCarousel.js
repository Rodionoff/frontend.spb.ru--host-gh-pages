class Carousel {
  constructor () {
    this.setControls()
    this.bindEventsToControls()
    this.setGlobalEventListener()
  }

  setGlobalEventListener() {
    window.addEventListener('click', (event) => {
      const target = event.target
      const imageWrapper = target.closest('.photo-image')

      if (imageWrapper) {
        this.currentIndex = [...this.imageWrappers].indexOf(imageWrapper)
        this.showModal()
      }
    })
  }

  setControls() {
    this.modal = document.querySelector('.modal')
    this.imageWrappers = document.querySelectorAll('.photo-image')
    this.lastImageIndex = this.imageWrappers.length - 1
    this.exit = document.createElement('div')
    this.exit.classList.add('exit')
    this.exit.innerHTML = '⌧'
    this.leftArrow = this.createArrow( 'leftArrow')
    this.rightArrow = this.createArrow( 'rightArrow')
  }

  setNewModalImage(nextPage) {
    if (nextPage === 'next') {
      this.currentIndex -= 1
      if (this.currentIndex < 0) this.currentIndex = this.lastImageIndex
    }
    if (nextPage === 'prev') {
      this.currentIndex += 1
      if (this.currentIndex > this.lastImageIndex) this.currentIndex = 0
    }

    this.updateImage()
  }

  updateImage() {
    this.modalImage.src = this.imageWrappers[this.currentIndex].querySelector('img').src
  }

  bindEventsToControls() {
    this.rightArrow.onclick = () => {
      this.setNewModalImage('next')
    }

    this.leftArrow.onclick = () => {
      this.setNewModalImage('prev')
    }

    this.exit.onclick = () => {
      this.modal.removeChild(this.modalImage)
      this.leftArrow.style.visibility = 'hidden'
      this.rightArrow.style.visibility = 'hidden'
      this.modal.classList.remove('showModal')
    }
  }

  createArrow(className) {
    let arrow = document.createElement('div')
    arrow.classList.add('arrow', className)
    arrow.innerHTML = '⌦'
    return arrow
  }

  showModal() {
    this.modalImage = document.createElement('img')
    this.modalImage.classList.add('modalImage')

    this.leftArrow.style.visibility = 'visible'
    this.rightArrow.style.visibility = 'visible'
    this.updateImage()
    this.appendElementsToModal()
    this.modal.classList.add('showModal')
  }

  appendElementsToModal() {
    this.modal.appendChild(this.exit)
    this.modal.appendChild(this.leftArrow)
    this.modal.appendChild(this.modalImage)
    this.modal.appendChild(this.rightArrow)
  }

  refresh() {
    this.setControls()
    this.bindEventsToControls()
  }
}

export default new Carousel()
