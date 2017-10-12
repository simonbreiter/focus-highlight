const path = require('path')

const lib = {
  entry: './src/FocusHighlight.js',
  output: {
    libraryTarget: 'umd',
    filename: 'FocusHighlight.js',
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
}

const test = {
  entry: './test/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/dist')
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
}

module.exports = [lib, test]
