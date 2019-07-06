const handleRefresh = () => {
  const firstNavlink = document.querySelector('.navlink span')

  if (firstNavlink !== null) {
    firstNavlink.style.cursor = 'pointer'

    firstNavlink.onclick = () => {
      // reloads current page
      // without refetching the data

      window.location.reload(false)
      // location = location
    }
  }
  const logo = document.querySelector('.navbar-logo div')

  if (logo !== null) {
    logo.style.cursor = 'pointer'

    logo.onclick = () => {
      // reloads current page
      // without refetching the data

      window.location.reload(false)
      // location = location
    }
  }
}

export {
  handleRefresh
}