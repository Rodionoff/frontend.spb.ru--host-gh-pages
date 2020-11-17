const path = require('path')

class SqipWebpackPlugin {
  constructor () {
    this.name = 'SqipWebpackPlugin'
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
          (htmlPluginData) => {
            return new Promise(resolve => {
              const htmlAttributeRegexp = /sqip-webpack-plugin-src=["'](.+?)\.(jpg|webp|jpeg|png|svg)/gi
              const imageUrlRegexp = /(?<=sqip-webpack-plugin-src=["'])(.+?)\.(jpg|webp|jpeg|png|svg)/gi
              let { html } = htmlPluginData;

              const attributes = html.match(htmlAttributeRegexp)
              if (Array.isArray(attributes)) {
                attributes.forEach(attribute => {
                  const urlSubstring = attribute.match(imageUrlRegexp)
                  const url = path.join(__dirname, 'src', ...urlSubstring)
                  const image = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.islandtours.ch%2Fmedia%2Fimg%2Fheader%2F1277x700%2Ffinnland-entlang-finnischer-nationalparks-shutterstock-1277.jpg&f=1&nofb=1'
                  const newAttribute = `src="${image}"`
                  html = html.replace(attribute, newAttribute)
                  htmlPluginData.html = html

                  resolve(htmlPluginData)
                })
              }

              resolve(htmlPluginData)
            })
          }
        )
      }
    )
  }
}

module.exports = SqipWebpackPlugin