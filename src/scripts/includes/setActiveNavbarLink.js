(() => {
  const navlinks = document.querySelectorAll('.navlink a')
  navlinks.forEach(navlink => navlink.classList.remove('navlink-active'))
  navlinks.forEach(navlink => {
    const current = navlink.getAttribute('href')
    if (location.pathname.startsWith(current)) {
      navlink.classList.add('navlink-active')
    }
  })
})()