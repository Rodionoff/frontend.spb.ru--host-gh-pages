module.exports = function(transformed) {
  const placeholderDataURL = transformed.preview
  return `background-image: url("${placeholderDataURL}")`
};