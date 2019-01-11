let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < images.length; i += 1) {
    let downloadedImg = new Image()

    // console.log(i)
    
    downloadedImg.onload = function() {
      images[i].replaceChild(downloadedImg, images[i].children[0])
    }

    downloadedImg.src = `./src/img/krooshkin/${i+1}.jpeg`
  }
})
