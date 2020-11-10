(() => {
  const navlinks = document.querySelectorAll('.navlink a')
  navlinks.forEach(navlink => {
    navlink.classList.remove('navlink-active')

    const href = navlink.getAttribute('href')
    if (location.pathname.startsWith(href)) {
      navlink.classList.add('navlink-active')
    }
  })
})()