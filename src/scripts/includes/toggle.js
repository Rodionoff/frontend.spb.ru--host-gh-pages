(() => {
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('click', e => {
      if (e.target.classList.contains('navbar-toggle')) {
        navbar.classList.add('show')
        window.addEventListener('click', _ => {
          navbar.classList.remove('show')
        }, {once: true})
      }
    })
  }
})()