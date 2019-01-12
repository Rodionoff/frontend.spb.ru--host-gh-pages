let posts = document.getElementsByClassName('post')
let tagclouds = document.getElementsByClassName('tagcloud')

Array.prototype.forEach.call(tagclouds, tagcloud => {
  // console.log(tagcloud.children)
  Array.prototype.forEach.call(tagcloud.children, tag => {
    // console.log(tag)
    tag.style.cursor = 'pointer'
    tag.onclick = searchForTag
  })
})

let tags = document.getElementsByClassName('tag')
Array.prototype.forEach.call(tags, tag => {
  // console.log(tag)
  tag.style.cursor = 'pointer'
  tag.onclick = searchForTag
})



function searchForTag() {
  Array.prototype.forEach.call(tagclouds, (tagcloud, i) => {
    let postVisibility = false;
    Array.prototype.forEach.call(tagcloud.children, tag => {
      
      if (tag.innerHTML === this.innerHTML) {
        console.log(tag.innerHTML, ' ', this.innerHTML)
        postVisibility = true;
      }
    })
      if (!postVisibility) {
        posts[i].style.display = 'none'
      }
    
  })
}

// function hidePost() {
//   Array.prototype.forEach.call(posts, post => {
//     !post.contains(tagcloud) ? post.style.display = 'none' : undefined
//   })
// }