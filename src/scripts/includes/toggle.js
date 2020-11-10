const navbar = document.querySelector('.navbar')
if (navbar) {
  window.addEventListener('click', e => {
    const toggle = e.target.closest('.navbar-toggle')
    if (toggle) {
      navbar.classList.toggle('show')
      return
    }

    navbar.classList.remove('show')
  })
}
