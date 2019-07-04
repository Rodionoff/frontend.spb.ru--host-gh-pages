(() => {
  const height = document.querySelector('.synth .work-image').clientHeight

  const images = document.querySelectorAll('.work-image')

  images.forEach(image => {
    image.clientHeight = height
  })

  window.addEventListener('resize', () => {
    images.forEach(image => {
      image.clientHeight = height
    })

  })
})()