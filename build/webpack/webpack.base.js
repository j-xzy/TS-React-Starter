const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: config.entry
  },
  output: {
    path: config.output
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': config.srcPath,
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [config.srcPath],
      use: ['babel-loader', 'tslint-loader'],
      exclude: [/node_modules/]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.template,
      inject: true,
      minify: {
        removeComments: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
  ]
}
