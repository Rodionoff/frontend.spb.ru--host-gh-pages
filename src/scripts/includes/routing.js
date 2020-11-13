import barba from '@barba/core';
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import { lazyLoad } from './lazyLoad'

barba.hooks.enter(() => {
  setActiveNavbarLink()
})

barba.init({
  transitions: [{
    name: 'default-transition',
  }],
  views: [{
    namespace: 'krooshkin',
    afterEnter() {
      lazyLoad()
      carousel.refresh()
    }
  }]
})