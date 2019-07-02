import jsCarousel from './jsCarousel'

(() => {
  let images = document.getElementsByClassName('photo-image')

  let photos = document.getElementsByClassName('photo')
  let overlays = document.getElementsByClassName('overlay')
  let imageDescriptions = document.getElementsByClassName('imageDescription')
  let linksToOpenModal = []


  Array.prototype.forEach.call(photos, (photo, index) => {
    let link = makeALinkWhichOpensModal()
    linksToOpenModal.push(link)
    imageDescriptions[index].appendChild(link)

    photo.onclick = function () {
      overlays[index].classList.toggle('showOverlay');
      imageDescriptions[index].classList.toggle('showDescription')
    }
  })

  function makeALinkWhichOpensModal() {
    let link = document.createElement('a')
    link.innerHTML = 'Показать изображение целиком'
    link.style.display = 'block'
    link.style.marginTop = '.4rem'
    link.style.fontSize = '14px'
    link.style.color = '#1778c2'
    link.style.cursor = 'pointer'
    return link
  }

  jsCarousel(linksToOpenModal, images)
})()