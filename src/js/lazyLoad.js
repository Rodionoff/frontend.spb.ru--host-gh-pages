let images = document.getElementsByClassName('photo-image')

document.addEventListener("DOMContentLoaded", () => {
  for (let i = images.length - 1; i >= 0; i -= 1) {
    // обратный порядок здесь для того чтобы
    // onload попадал в стек в обратном порядке
    // то есть первыми в стек попадают последние
    // изображения а значит они же последними и выходят
    let downloadedImg = new Image()

    
    downloadedImg.onload = function() {
      images[i].replaceChild(downloadedImg, images[i].children[0])
    }

    downloadedImg.src = `./src/img/krooshkin/${i+1}.jpeg`
  }
})
