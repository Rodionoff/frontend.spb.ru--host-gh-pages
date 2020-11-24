import hljs from 'highlight.js'

const highlight = () => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
}

export default highlight