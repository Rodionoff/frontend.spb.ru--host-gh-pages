let titles = document.getElementsByClassName('work-title')
let texts = document.getElementsByClassName('work-text')
let worksArea = document.getElementsByClassName('works')[0]
let modalWindow = document.getElementsByClassName('modal')[0]
let tooltip = document.getElementsByClassName('tooltip')[0]
let exitButton = document.getElementsByClassName('tooltip__exit')[0]

addLinksThatDoStuff(titles)

function addLinksThatDoStuff(whereToAddLink) {
  Array.prototype.forEach.call(whereToAddLink, (el, index) => {

    exitButton.innerHTML = '⌧'

    let link1 = createLink('Показать описание')
    // let link2 = createLink('Показать описание в модальном окне')

    link1.onclick = function () {
      // if (this.innerHTML === 'Показать описание') {
        // this.innerHTML = 'Скрыть описание';
        tooltip.innerHTML = texts[index].innerHTML
        tooltip.appendChild(exitButton)
        modalWindow.style.visibility = 'visible'
        worksArea.appendChild(modalWindow)
        // return
      // }  
        // this.innerHTML = 'Показать описание'
        // modalWindow.style.display = 'none'
    }  

    exitButton.onclick = function() {
      modalWindow.style.visibility = 'hidden'
    }
    el.appendChild(link1);
    
  })
}

function createLink(linkText) {
  let link = document.createElement('a');
  link.innerHTML = linkText
  link.style.display = 'block'
  link.style.marginTop = '1rem'
  link.style.display = 'block'
  link.style.fontSize = '14px'
  link.style.color = '#1778c2'
  link.style.cursor = 'pointer'
  return link
}