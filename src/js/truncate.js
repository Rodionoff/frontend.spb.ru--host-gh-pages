let genericTexts = document.getElementsByClassName('post-text');

truncate(genericTexts, 60)
  .then(truncated => addReadMoreLink(truncated))
  .then(links => makeLinksUseFull(links))

function truncate(texts, wordsToKeep) {
  return new Promise(resolve => {
    let sample = [];
    resolve(
      Array.prototype.map.call(texts, (text, index) => {
        sample.push(text.innerHTML);
        let textArray = text.innerText.split(' ');

        if (textArray.length >= wordsToKeep) {
          let truncated = textArray.splice(0, wordsToKeep).join(' ').trim();

          let lastSymbol = truncated.split('')[truncated.length - 1]

          if (lastSymbol === '.' || lastSymbol === ',') {
            truncated = truncated.split('').splice(0, truncated.length - 1).join('')

          }
          text.innerText = truncated + '...'
          // readMore(text)
          return [text, index, sample]
        }
        return [false, index, 0]
      }))
  })
}

function addReadMoreLink(elements) {
  return new Promise(resolve => {
    resolve(
      elements.map(el => {
        let truncatedNodeOfText = el[0];
        let indexOfText = el[1];
        let sample = el[2];
        if (truncatedNodeOfText !== false) {
          let linkToOpenSample = document.createElement('a');
          // linkToOpenSample.classList.add('readMore')
          linkToOpenSample.innerHTML = 'Читать далее'
          linkToOpenSample.style.display = 'block'
          linkToOpenSample.style.marginTop = '1rem'
          linkToOpenSample.style.fontSize = '14px'
          linkToOpenSample.style.color = '#1778c2'
          linkToOpenSample.style.cursor = 'pointer'
          // console.log(el)
          truncatedNodeOfText.appendChild(linkToOpenSample);
          return [linkToOpenSample, indexOfText, sample, truncatedNodeOfText]
        }
        return [false, 0, 0]
      }))
  })
}


function makeLinksUseFull(elements) {
  elements.forEach(el => {
    let link = el[0];
    let indexOfText = el[1]
    let sample = el[2]
    let truncatedNodeOfText = el[3]
    if (link !== false) {
      link.addEventListener('click', () => {
        truncatedNodeOfText.innerHTML = sample[indexOfText]
        // console.log(truncatedNodeOfText.innerHTML)
      })
    }
  })
}