(() => {
  const images = document.querySelectorAll('.photo-image img')
  images.forEach(image => {
    const temp = new Image();
    temp.onload = () => {
      image.src = temp.src
    }
    temp.src = image.dataset.src
  })
})();
