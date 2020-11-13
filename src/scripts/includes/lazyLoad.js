const krooshkinPhotosLoadedEvent = new CustomEvent('krooshkinPhotosLoaded')

const lazyLoad = () => {
  const images = document.querySelectorAll('.photo-image img')
  let loadedImages = []
  images.forEach(image => {
    const temp = new Image()
    temp.onload = () => {
      image.src = temp.src
      loadedImages.push(image)
      if (loadedImages.length === images.length) window.dispatchEvent(krooshkinPhotosLoadedEvent)
    }
    temp.src = image.dataset.src
  })
}

module.exports = {
  krooshkinPhotosLoadedEvent,
  lazyLoad
}

