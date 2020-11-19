const path = require('path')
const sqip = require('sqip').default

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

  createSrcAttribute(dataURI) {
    return `src="${dataURI}"`
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
            const attributes = this.getAttributes(html)
            if (Array.isArray(attributes)) {
              for (let i=0; i<attributes.length; i++) {
                const attribute = attributes[i];
                const imagePath = this.getImagePath(attribute)
                console.log(imagePath)
                let convertedImage;
                try {
                  convertedImage = await sqip({input: imagePath})
                  console.log(convertedImage)
                } catch(err) {
                  console.log(err)
                }
                console.log({convertedImage})
                const { dataURI } = convertedImage.metadata
                const src = this.createSrcAttribute(dataURI)
                console.log({src})
                html = html.replace(attribute, src)
                console.log({html})
              }
            }

            htmlPluginData.html = html
            return htmlPluginData
          }
        )
      })
  }
}

module.exports = SqipWebpackPlugin