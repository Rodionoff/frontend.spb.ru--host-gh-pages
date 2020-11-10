(() => {
  const navlinks = document.querySelectorAll('.navlink a')
  navlinks.forEach(navlink => {
    const href = navlink.getAttribute('href')
    const matches = location.pathname.startsWith(href)

    if (matches) {
      navlink.classList.add('navlink-active')
      return
    }

    navlink.classList.remove('navlink-active')
  })
})()