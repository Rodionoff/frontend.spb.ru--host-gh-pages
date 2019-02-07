export default function jsCarousel(links, imgs) {
  let modal = document.getElementsByClassName('modal')[0]
  // let imgs = document.getElementsByClassName('photo-image')

  let exit = document.createElement('div')
  exit.classList.add('exit')
  exit.innerHTML = '⌧'
  
  let leftArrow = createArrow('div', 'leftArrow', '⌦')
  let rightArrow = createArrow('div', 'rightArrow', '⌦')

  function createArrow(elementName, className, sign) {
    let arrow = document.createElement(elementName)
    arrow.classList.add('arrow')
    arrow.classList.add(className)
    arrow.innerHTML = sign;
    return arrow
  }

  let image = document.createElement('img');
  image.classList.add('modalImage')


  links.forEach((link, index) => {
    link.onclick = function() {
      showModal(image, index)
    }
  })

  function showModal(img, i) {
    img.pk = i
      if (img.pk == 0) {
        leftArrow.style.visibility = 'hidden'
        rightArrow.style.visibility = 'visible'
      } else if (img.pk > 0 && img.pk < imgs.length - 1) {
        leftArrow.style.visibility = 'visible'
        rightArrow.style.visibility = 'visible'
      } else if (img.pk == imgs.length - 1) {
        leftArrow.style.visibility = 'visible'
        rightArrow.style.visibility = 'hidden'
      }
      img.src = imgs[i].lastElementChild.src
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

  rightArrow.onclick = function() {
    leftArrow.style.visibility = 'visible'
    let image = document.getElementsByClassName('modalImage')[0]
    image.pk += 1
    image.src = imgs[image.pk].lastElementChild.src

    let nextImageExists = imgs[image.pk + 1] !== undefined

    if (!nextImageExists) {
      rightArrow.style.visibility = 'hidden'
    }
  }

  leftArrow.onclick = function() {
    rightArrow.style.visibility = 'visible'
    let image = document.getElementsByClassName('modalImage')[0]
    image.pk -= 1
    image.src = imgs[image.pk].lastElementChild.src
    
    let previousImageExists = imgs[image.pk - 1] !== undefined

    if (!previousImageExists) {
      leftArrow.style.visibility = 'hidden'
    }
  }

  exit.onclick = function () {
    let image = document.getElementsByClassName('modalImage')[0]
    modal.removeChild(image)
    leftArrow.style.visibility = 'hidden'
    rightArrow.style.visibility = 'hidden'
    modal.classList.remove('showModal')
  }
}
