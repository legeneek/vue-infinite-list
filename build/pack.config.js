const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/infiniteList.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    filename: 'infiniteList.js'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}