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
        // console.log('Lenght: ', compiler.options.plugins.filter(
        //   (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin').length)
        const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;

        hook.tapPromise(
          this.name,
          (htmlPluginData) => {
            return new Promise(resolve => {
              // console.log(htmlPluginData.html)
              htmlPluginData.html = htmlPluginData.html.replace('/media/img/frontend/vs_sw_screenshotII.png', 'https://www.themasculinetraveler.com/wp-content/uploads/2018/02/Helsinki-Finland.jpg')
                // = 'heh heh heh html5'
              // return htmlPluginData
              resolve(htmlPluginData)
            })
          }
        )
      }
    )
  }
}

module.exports = SqipWebpackPlugin