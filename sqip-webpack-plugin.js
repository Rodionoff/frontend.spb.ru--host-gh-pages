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
            return new Promise((resolve, reject) => {
              const oldImage = '/media/img/frontend/vs_sw_screenshotII.png'
              const newImage = 'https://www.urlaubsguru.at/wp-content/uploads/2017/03/sommer-von-helsinki-finnland-istock_000024367312_large-2.jpg'
              htmlPluginData.html = htmlPluginData.html.replace(oldImage, newImage)

              resolve(htmlPluginData)
            })
          }
        )
      }
    )
  }
}

module.exports = SqipWebpackPlugin