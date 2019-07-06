(() => {
  const images = document.querySelectorAll('.photo-image')

  document.addEventListener("DOMContentLoaded", () => {
    Array.prototype.map.call(images, (image, i) => {
      // photos names are starting from 1
      i++;
      new Promise(resolve => {
        resolve(image.children[0].src = `../assets/img/krooshkin/${i + 1}.jpeg`)
      })
    })
  })

})()
