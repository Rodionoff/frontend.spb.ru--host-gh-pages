import barba from '@barba/core';
import gsap from "gsap";
import setActiveNavbarLink from './setActiveNavbarLink'
import carousel from './jsCarousel'
import lazy from './LazyLoad'
import highlight from './highlght'
import resetPageScroll from './resetPageScroll'

window.addEventListener('DOMContentLoaded', _ => {
  return new Promise(resolve => {
    setActiveNavbarLink()
    highlight()
    const { pathname } = location
    lazy.load(pathname)

    resolve()
  })
}, {once: true})

barba.hooks.leave(resetPageScroll)
barba.hooks.enter(data => {
  return new Promise(resolve => {
    setActiveNavbarLink()
    highlight()

    const pathname = data.next.url.path
    if (lazy.loadedPages.includes(pathname)) {
      document.body.classList.add('pageLoaded')
    } else {
      document.body.classList.remove('pageLoaded')
      lazy.load(pathname)
    }

    resolve()
  })
})


barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: .25,
        ease: "power1.out",
        display: 'none'
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: .25,
        ease: "power1.in"
      });
    }
  }],
  views: [{
    namespace: 'krooshkin',
    afterEnter() {
      carousel.refresh()
    }
  }]
})