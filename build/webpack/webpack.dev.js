const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base');
const config = require('../config');

// entry变为数组，注入autoreload代码
base.entry.app = [path.join(__dirname, '..', 'script', 'autoReload.js')]
  .concat(base.entry.app);

base.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  }, {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      'stylus-loader'
    ]
  }
);

module.exports = merge(base, {
  output: {
    publicPath: config.devPublicPath
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: config.template
    })
  ]
});
