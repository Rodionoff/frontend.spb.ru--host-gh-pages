const path = require('path')
const sqip = require('sqip')
const { encode } = require('js-base64')

class SqipWebpackPlugin {
  constructor () {
    this.name = 'SqipWebpackPlugin'
    this.htmlAttributeRegexp = /sqip-webpack-plugin-src=["'](.+?)\.(jpg|webp|jpeg|png|svg)['"]/gi
    this.imageUrlRegexp = /(?<=sqip-webpack-plugin-src=["'])(.+?)\.(jpg|webp|jpeg|png|svg)/gi
  }

  getAttributes (html) {
    return html.match(this.htmlAttributeRegexp)
  }

  getImagePath (attribute) {
    const [parsedPath] = attribute.match(this.imageUrlRegexp)
    return path.join(__dirname, 'src', parsedPath)
  }

  createSrcAttribute (svg_base64encoded) {
    return `src='data:image/svg+xml;base64,${svg_base64encoded}'`
  }

  createDefaultBase64Placeholder() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect fill="#eee" width="300" height="200"/>
      <text fill="rgba(0,0,0,0.67)" font-family="sans-serif" font-size="30" dy="10.5" font-weight="normal" x="50%" y="50%" text-anchor="middle">
      Placeholder
</text>
    </svg>`

    return encode(svg)
  }

  apply (compiler) {
    compiler.hooks.compilation.tap(
      this.name,
      (compilation) => {
        const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin')
        const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit

        hook.tapPromise(
          this.name,
          async (htmlPluginData) => {
            let { html } = htmlPluginData
            const attributes = this.getAttributes(html)
            if (Array.isArray(attributes)) {
              const promises = await attributes.map(async attribute => {
                const { mode } = compiler.options
                if (mode !== 'production') {
                  const placeholder = this.createDefaultBase64Placeholder()
                  let converted = {}
                  converted.svg_base64encoded = placeholder
                  return converted
                }
                const imagePath = this.getImagePath(attribute)
                console.log(`Making sqip placeholder:\n${imagePath}`)
                return sqip({
                  filename: imagePath,
                })
              })

              const convertedImages = await Promise.all(promises)
              convertedImages.forEach((converted, i) => {
                const currentAttribute = attributes[i]
                const { svg_base64encoded } = converted
                const newAttribute = this.createSrcAttribute(svg_base64encoded)
                html = html.replace(currentAttribute, newAttribute)
              })
            }

            htmlPluginData.html = html
            return htmlPluginData
          }
        )
      }
    )
  }
}

module.exports = SqipWebpackPlugin