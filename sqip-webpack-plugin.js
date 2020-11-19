const path = require('path')
const sqip = require('sqip')

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

  getStringAfterDelay(string, ms) {
    return this.delay(ms)
      .then(() => string)
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
              let counter = 0
              const promises = attributes.map(async attribute => {
                counter++
                const parsedUrl = this.getImagePath(attribute)
                const url = path.join(__dirname, 'src', parsedUrl)

                const string = await this.getStringAfterDelay(counter, 20000*counter)
                console.log(string)
                return string
              })

              const results = await Promise.all(promises)
              console.log(`All promises have been resolved`)
            }

            return htmlPluginData
          }
        )
















        // hook.tapPromise(
        //   this.name,
        //   async (htmlPluginData) => {
        //     const newHtml = await (() => 'heh2203')()
        //     htmlPluginData.html = newHtml
        //     return htmlPluginData
        //   }
        // )
      })
  }
}

module.exports = SqipWebpackPlugin