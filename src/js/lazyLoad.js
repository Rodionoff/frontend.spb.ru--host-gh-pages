let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  Array.prototype.map.call(images, (image, i) => {
    new Promise(resolve => {
    resolve(image.children[0].src = `./src/img/krooshkin/${i+1}.jpeg`)
    })
  })
})
