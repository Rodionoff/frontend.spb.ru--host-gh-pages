const path = require('path')
const sqip = require('sqip').default

class SqipWebpackPlugin {
  constructor () {
    this.name = 'SqipWebpackPlugin'
    this.htmlAttributeRegexp = /sqip-webpack-plugin-src=["'](.+?)\.(jpg|webp|jpeg|png|svg)/gi
    this.imageUrlRegexp = /(?<=sqip-webpack-plugin-src=["'])(.+?)\.(jpg|webp|jpeg|png|svg)/gi
  }

  getattributes (html) {
    return html.match(this.htmlAttributeRegexp)
  }

  getImagePath (attribute) {
    const [parsedPath] = attribute.match(this.imageUrlRegexp)
    return path.join(__dirname, 'src', parsedPath)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  apply (compiler) {
    compiler.hooks.compilation.tap(
      this.name,
      (compilation) => {
        const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin');
        const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;

        hook.tapPromise(
          this.name,
           async (htmlPluginData) => {
            let { html } = htmlPluginData
            const attributes = this.getattributes(html)
            if (Array.isArray(attributes)) {
              for (let i=0; i<attributes.length; i++) {
                const attribute = attributes[i];
                const imagePath = this.getImagePath(attribute)
                const convertedImage = await sqip({input: imagePath})
                console.log(convertedImage)
              }
            }

            return htmlPluginData
          }
        )
      })
  }
}

module.exports = SqipWebpackPlugin