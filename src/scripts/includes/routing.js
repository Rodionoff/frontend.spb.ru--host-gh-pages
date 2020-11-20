import barba from '@barba/core';
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import { lazy } from './lazyLoad'

barba.hooks.afterLeave(data => {
  const nextPageUrl = data.next.pathname
})

barba.hooks.enter(() => {
  lazy.load()
  setActiveNavbarLink()
})

barba.init({
  transitions: [{
    name: 'default-transition',
  }],
  views: [{
    namespace: 'krooshkin',
    afterEnter() {
      carousel.refresh()
    }
  }]
})