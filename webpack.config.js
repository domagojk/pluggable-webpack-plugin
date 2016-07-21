var path = require('path');

module.exports = {
  entry: './src/pluggable.js',
  output: {
    path: './dist',
    filename: 'pluggable.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, './src'),
        ],
      }
    ]
  }
};