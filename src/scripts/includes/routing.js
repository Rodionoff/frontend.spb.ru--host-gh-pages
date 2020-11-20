import barba from '@barba/core';
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import lazy from './lazyLoad'

barba.hooks.enter(() => {
  setActiveNavbarLink()
})

barba.hooks.beforeEnter(() => lazy.load())

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