import sqip from 'sqip' // in node will be =>
// const sqip = require('sqip').default
// // import { resolve } from 'path'

const convert = async (url) => {
  try {
    console.log({urlurlrul: url})
    const result = await sqip({
      input: url
    })
    console.log(result)

    // return result.metadata.dataURI
    return 'fdfdf'
  } catch (err) {
    console.error(err)
  }
}

module.exports = url => convert(url)