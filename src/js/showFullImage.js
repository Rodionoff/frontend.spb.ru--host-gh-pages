let images = document.getElementsByClassName('work-image')
let titles = document.getElementsByClassName('work-title')
let texts = document.getElementsByClassName('work-text')

addLinksThatDoStuff(titles)

function addLinksThatDoStuff(whereToAddLink) {
  Array.prototype.forEach.call(whereToAddLink, (el, index) => {
    let link1 = createLink('Развернуть изображение')
    // let link2 = createLink('Открыть изображение в модальном окне')

    link1.onclick = function showFullImage() {
      if (images[index].classList.contains('work-image-truncate')) {
        images[index].classList.remove('work-image-truncate')
        link1.innerHTML = 'Скрыть изображение'
      } else {
        images[index].classList.add('work-image-truncate')
        link1.innerHTML = 'Развернуть изображение'
      }
    }
    el.appendChild(link1);
    // el.appendChild(link2)
    
  })
}

function createLink(linkText) {
  let link = document.createElement('a');
  link.innerHTML = linkText
  link.style.display = 'block'
  link.style.marginTop = '1rem'
  link.style.fontSize = '14px'
  link.style.color = '#1778c2'
  link.style.cursor = 'pointer'
  return link
}
