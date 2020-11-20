const path = require('path')
const sqip = require('sqip')

class SqipWebpackPlugin {
  constructor() {
    this.name = 'SqipWebpackPlugin'
    this.htmlAttributeRegexp = /sqip-webpack-plugin-src=["'](.+?)\.(jpg|webp|jpeg|png|svg)['"]/gi
    this.imageUrlRegexp = /(?<=sqip-webpack-plugin-src=["'])(.+?)\.(jpg|webp|jpeg|png|svg)/gi
  }

  getAttributes(html) {
    return html.match(this.htmlAttributeRegexp)
  }

  getImagePath(attribute) {
    const [parsedPath] = attribute.match(this.imageUrlRegexp)
    return path.join(__dirname, 'src', parsedPath)
  }

  createSrcAttribute(svg_base64encoded) {
    return `src='data:image/svg+xml;base64,${svg_base64encoded}'`
  }

  apply(compiler) {
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
                const imagePath = this.getImagePath(attribute)
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
                // console.log({converted})
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