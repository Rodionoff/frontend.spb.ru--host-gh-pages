// export default function jsCarousel(links, images) {
(() => {
  const modal = document.querySelector('.modal')
  const images = document.querySelectorAll('.photo-image')
  const imagesWrapper = document.querySelector('.photos')

  const jsCarousel = () => {
    const exit = document.createElement('div')
    exit.classList.add('exit')
    exit.innerHTML = '⌧'

    const leftArrow = createArrow('div', 'leftArrow', '⌦')
    const rightArrow = createArrow('div', 'rightArrow', '⌦')

    function createArrow(elementName, className, sign) {
      let arrow = document.createElement(elementName)
      arrow.classList.add('arrow')
      arrow.classList.add(className)
      arrow.innerHTML = sign;
      return arrow
    }

    // links.forEach((link, index) => {
    //   link.onclick = function() {
    //     showModal(image, index)
    //   }
    // })

    imagesWrapper.addEventListener('click', (event) => {
      const findIndex = (node) => {
        if (node !== undefined) {
          return Array.prototype.indexOf.call(images, node)
        }
      }

      const target = event.target

      if (target.tagName === 'IMG') {
        const parent = target.parentNode
        const index = findIndex(parent)
        showModal(index)
      }

    })

    function showModal(i) {
      let img = document.createElement('img');
      img.classList.add('modalImage')

      leftArrow.style.visibility = 'visible'
      rightArrow.style.visibility = 'visible'
      img.pk = i;
      if (img.pk == 0) {
        // leftArrow.style.visibility = 'hidden'
        // rightArrow.style.visibility = 'visible'
      } else if (img.pk > 0 && img.pk < images.length - 1) {
        // leftArrow.style.visibility = 'visible'
        // rightArrow.style.visibility = 'visible'
      } else if (img.pk === images.length - 1) {
        // leftArrow.style.visibility = 'visible'
        // rightArrow.style.visibility = 'hidden'
      }
      img.src = images[i].lastElementChild.src
      console.log(img)
      appendElementsToModal(img)
      modal.classList.add('showModal')
    }

    function appendElementsToModal(img) {
      modal.appendChild(exit)
      modal.appendChild(leftArrow)
      modal.appendChild(img)
      modal.appendChild(rightArrow)
    }

    rightArrow.onclick = function () {
      leftArrow.style.visibility = 'visible'
      let image = document.getElementsByClassName('modalImage')[0]
      image.pk += 1
      let isLastImage = images[image.pk] === undefined

      if (isLastImage) {
        // rightArrow.style.visibility = 'hidden'
        image.pk = 0
      }
      image.src = images[image.pk].lastElementChild.src
    }

    leftArrow.onclick = function () {
      rightArrow.style.visibility = 'visible'
      let image = document.getElementsByClassName('modalImage')[0]
      image.pk -= 1
      let isFirstImage = images[image.pk] === undefined

      if (isFirstImage) {
        // leftArrow.style.visibility = 'hidden'
        image.pk = images.length - 1
      }
      image.src = images[image.pk].lastElementChild.src
    }

    exit.onclick = function () {
      let image = document.getElementsByClassName('modalImage')[0]
      modal.removeChild(image)
      leftArrow.style.visibility = 'hidden'
      rightArrow.style.visibility = 'hidden'
      modal.classList.remove('showModal')
    }
  };

  modal && images && imagesWrapper && jsCarousel();

})();
