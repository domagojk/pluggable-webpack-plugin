var path = require('path');
//var Pluggable = require('./src/pluggable');

module.exports = {
  entry: {
      a: "./a",
      b: "./b",
      c: ["./c", "./d"]
  },
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
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.dirname(require.resolve('codeanywhere-plugin-test/package.json')) + '/src/',
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