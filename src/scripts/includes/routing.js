import barba from '@barba/core'
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import highlight from './highlght'
import resetPageScroll from './resetPageScroll'
import updateYear from './updateFooterYear'

window.addEventListener('DOMContentLoaded', _ => {
  return new Promise(resolve => {
    setActiveNavbarLink()
    updateYear()
    highlight()

    resolve()
  })
}, {once: true})

barba.hooks.beforeEnter(_ => {
  return new Promise(resolve => {
      resetPageScroll()
        .then(resolve)
  })
})

barba.hooks.enter(_ => {
  return new Promise(resolve => {
      setActiveNavbarLink()
      updateYear()
      highlight()

      resolve()
  })
})


barba.init({
  transitions: [{
    name: 'default-instant-transition',
  }],
  views: [{
    namespace: 'krooshkin',
    afterEnter() {
      carousel.refresh()
    }
  }]
})