var path = require('path');
//var Pluggable = require('./src/pluggable');

module.exports = {
  entry: './src/test.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  plugins: [
    /*new Pluggable({
      ca: 'codeanywhere-plugin-test'
    })*/
  ],
  devServer: {
    contentBase: './public',
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
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      nekivrag: 'node_modules/jquery'
    },
    extensions: ['', '.js']
  }
};