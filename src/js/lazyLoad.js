let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  Array.prototype.forEach.call(images, function(ChildIsImage, i) {

    let downloadedImg = new Image()
    
    // console.log(ChildIsImage)
    downloadedImg.onload = function() {
      images[i].replaceChild(downloadedImg, ChildIsImage.children[0])
    }

    downloadedImg.src = `./src/img/krooshkin/${i+1}.jpeg`
  })
})
