import barba from '@barba/core';
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import lazy from './LazyLoad'

window.addEventListener('DOMContentLoaded', _ => {
  return new Promise(resolve => {
    setActiveNavbarLink()
    const page = {}
    page.pathname = location.pathname
    lazy.load(page)

    resolve()
  })
}, {once: true})

barba.hooks.enter(data => {
  return new Promise(resolve => {
    setActiveNavbarLink()

    const page = {}
    page.pathname = data.next.url.path
    page.container = data.next.container
    if (lazy.loadedPages.includes(page.pathname)) {
      document.body.classList.add('pageLoaded')
    } else {
      document.body.classList.remove('pageLoaded')
      lazy.load(page)
    }

    resolve()
  })
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