let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  let promises = Array.prototype.map.call(images, (image, i) => {
    return new Promise(resolve => {
    resolve(image.children[0].src = `./src/img/krooshkin/${i+1}.jpeg`)
    })
  })
  Promise.all(promises)
})
