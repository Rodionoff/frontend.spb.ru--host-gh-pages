let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  Array.prototype.forEach.call(images, (image, i) => {
    image.lastElementChild.src = `./src/img/krooshkin/${i+1}.jpeg`
    console.log(image.lastElementChild.src)
  })
})