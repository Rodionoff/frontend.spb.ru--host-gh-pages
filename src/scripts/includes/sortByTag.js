(() => {
  const tagclouds = document.querySelectorAll('.tagcloud')
  if (tagclouds.length) {
    window.addEventListener('click', e => {
      if (e.target.classList.contains('tag')) {
        const filter = e.target.innerHTML
        tagclouds.forEach(tagcloud => {
          const tags = tagcloud.querySelectorAll('.tag')
          const matches = [...tags].filter(tag => tag.innerHTML === filter)
          if (matches.length === 0) {
            const post = tagcloud.closest('.post')
            if (post) post.style.display = 'none'
          }
        })
      }
    })
  }
})()