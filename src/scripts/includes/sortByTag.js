(() => {
  const tags = document.querySelectorAll('.tagcloud .tag')
  if (tags.length > 0) {
    window.addEventListener('click', e => {
      const { classList }  = e.target
      // if (classList.contains('tag')) {
      //   alert('hoi')
      // }
      e.preventDefault()
    })
  }
})()