class Carousel {
  constructor () {
    this.modal = document.querySelector('.modal')
    this.images = document.querySelectorAll('.photo-image')
    this.imagesWrapper = document.querySelector('.photos')
    this.exit = document.createElement('div')
    this.exit.classList.add('exit')
    this.exit.innerHTML = '⌧'
    this.leftArrow = this.createArrow('div', 'leftArrow', '⌦')
    this.rightArrow = this.createArrow('div', 'rightArrow', '⌦')

    this.imagesWrapper.addEventListener('click', (event) => {
      const findIndex = (node) => {
        if (node !== undefined) {
          return Array.prototype.indexOf.call(this.images, node)
        }
      }

      const target = event.target

      if (target.tagName === 'IMG') {
        const parent = target.parentNode
        const index = findIndex(parent)
        this.showModal(index)
      }
    })

    this.bindEventsToControls()
  }

  createArrow (elementName, className, sign) {
    let arrow = document.createElement(elementName)
    arrow.classList.add('arrow')
    arrow.classList.add(className)
    arrow.innerHTML = sign
    return arrow
  }

  showModal (i) {
    let img = document.createElement('img')
    img.classList.add('modalImage')

    this.leftArrow.style.visibility = 'visible'
    this.rightArrow.style.visibility = 'visible'
    img.pk = i
    img.src = this.images[i].lastElementChild.src
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
      let image = document.getElementsByClassName('modalImage')[0]
      image.pk += 1
      let isLastImage = this.images[image.pk] === undefined

      if (isLastImage) {
        image.pk = 0
      }
      image.src = this.images[image.pk].lastElementChild.src
    }

    this.leftArrow.onclick = () => {
      this.rightArrow.style.visibility = 'visible'
      let image = document.getElementsByClassName('modalImage')[0]
      image.pk -= 1
      let isFirstImage = this.images[image.pk] === undefined

      if (isFirstImage) {
        image.pk = this.images.length - 1
      }
      image.src = this.images[image.pk].lastElementChild.src
    }

    this.exit.onclick = () => {
      let image = document.getElementsByClassName('modalImage')[0]
      this.modal.removeChild(image)
      this.leftArrow.style.visibility = 'hidden'
      this.rightArrow.style.visibility = 'hidden'
      this.modal.classList.remove('showModal')
    }
  }
}

new Carousel()
