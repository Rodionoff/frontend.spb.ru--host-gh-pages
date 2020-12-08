import barba from '@barba/core'
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import highlight from './highlght'
import resetPageScroll from './resetPageScroll'

window.addEventListener('DOMContentLoaded', _ => {
  return new Promise(resolve => {
    setActiveNavbarLink()
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