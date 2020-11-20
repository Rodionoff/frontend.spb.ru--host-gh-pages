import barba from '@barba/core';
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import lazy from './LazyLoad'

barba.hooks.beforeEnter(lazy.load)
barba.hooks.enter(setActiveNavbarLink)

barba.init({
  transitions: [{
    name: 'default-transition',
  }],
  views: [{
    namespace: 'krooshkin',
    afterEnter() {
      if (document.body.classList.contains('pageLoaded')) carousel.refresh()
    }
  }]
})