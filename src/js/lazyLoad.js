let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  Array.prototype.forEach.call(images, (image, i) => {
    // обратный порядок здесь для того чтобы
    // onload попадал в стек в обратном порядке

    image.children[0].src = `./src/img/krooshkin/${i+1}.jpeg`
  })
})
