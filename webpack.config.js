const path = require('path')

module.exports = {
  entry: './test/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/dist')
  }
}
