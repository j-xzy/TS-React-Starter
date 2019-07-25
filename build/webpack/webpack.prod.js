const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');
const config = require('../config');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

// 解决PublicPath为相对路径时,css中引入图片路径问题
const cssPublicPath = path.isAbsolute(config.prodPublicPath) ? config.prodPublicPath : '../';

module.exports = merge(base, {
  output: {
    publicPath: config.prodPublicPath,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
    minimizer: [new OptimizeCSSAssetsPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: cssPublicPath
        }
      },
        'css-loader',
      ],
    }, {
      test: /\.styl$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: cssPublicPath
        }
      },
        'css-loader',
        'stylus-loader'
      ]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/style.[hash].css',
      allChunks: true,
      ignoreOrder: false
    })
  ]
})
