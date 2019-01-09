let photos = document.getElementsByClassName('photo')
let overlays = document.getElementsByClassName('overlay')
let imageDescriptions = document.getElementsByClassName('imageDescription')
let modal = document.getElementsByClassName('modal')[0]
let images = document.getElementsByClassName('photo-image')
let links = []

let exit = document.createElement('div')
exit.classList.add('exit')
exit.innerHTML = '✖'

let rightArrow = document.createElement('div');
rightArrow.classList.add('arrow');
rightArrow.classList.add('rightArrow')
rightArrow.innerHTML = '⌦';

let leftArrow = document.createElement('div')
leftArrow.classList.add('arrow')
leftArrow.classList.add('leftArrow')
leftArrow.innerHTML = '⌦';


Array.prototype.forEach.call(photos, (photo, index) => {
  // makeLinkToDescription(imageDescriptions[index], index)
  let link = makeLinkToDisplayOverlay()
  links.push(link)
  imageDescriptions[index].appendChild(link)

  photo.onclick = function () {
    overlays[index].classList.toggle('showOverlay');
    imageDescriptions[index].classList.toggle('showDescription')
  }
})

function jsCarousel() {
  let image = document.createElement('img');
  // image.src = images[index].src
  image.classList.add('modalImage')

  let positions = []

  for (let i = 0; i < links.length; i += 1) {
    positions.push(i)
  }

  links.forEach((link, index) => {
    link.onclick = function() {
      showModal(image, index)
    }
  })

  rightArrow.onclick = function() {
    leftArrow.style.visibility = 'visible'
    let image = document.getElementsByClassName('modalImage')[0]
    image.pk += 1
    image.src = images[image.pk].lastElementChild.src

    let nextImageExists = images[image.pk + 1] !== undefined

    if (!nextImageExists) {
      rightArrow.style.visibility = 'hidden'
    }
  }

  leftArrow.onclick = function() {
    rightArrow.style.visibility = 'visible'
    let image = document.getElementsByClassName('modalImage')[0]
    image.pk -= 1
    image.src = images[image.pk].lastElementChild.src
    
    let previousImageExists = images[image.pk - 1] !== undefined

    if (!previousImageExists) {
      leftArrow.style.visibility = 'hidden'
    }
  }
  
  
  function showModal(img, i) {
    img.pk = i
      if (img.pk == 0) {
        leftArrow.style.visibility = 'hidden'
        rightArrow.style.visibility = 'visible'
      } else if (img.pk > 0 && img.pk < images.length - 1) {
        leftArrow.style.visibility = 'visible'
        rightArrow.style.visibility = 'visible'
      } else if (img.pk == images.length - 1) {
        leftArrow.style.visibility = 'visible'
        rightArrow.style.visibility = 'hidden'
      }
      img.src = images[i].lastElementChild.src
      console.log(img)
      appendElementsToModal(img)
      modal.classList.add('showModal')
  }

  exit.onclick = function () {
    // modal.childNodes.forEach(node => {
    //   node.src ? modal.removeChild(node) : undefined
    // })
    let image = document.getElementsByClassName('modalImage')[0]
    modal.removeChild(image)
    leftArrow.style.visibility = 'hidden'
    rightArrow.style.visibility = 'hidden'
    modal.classList.remove('showModal')
  }
}

jsCarousel()

function makeLinkToDisplayOverlay() {
  let link = document.createElement('a')
  link.innerHTML = 'Показать изображение целиком'
  link.style.display = 'block'
  link.style.marginTop = '.4rem'
  link.style.fontSize = '14px'
  link.style.color = '#1778c2'
  link.style.cursor = 'pointer'
  return link
}

function appendElementsToModal(img) {
  modal.appendChild(exit)
  modal.appendChild(leftArrow)
  modal.appendChild(img)
  modal.appendChild(rightArrow)
}