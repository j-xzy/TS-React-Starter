const path = require('path');
const rootPath = path.join(__dirname, '../');
const srcPath = path.join(rootPath, 'src');

module.exports = {
  root: rootPath,
  entry: path.join(srcPath, 'index.ts'),
  output: path.join(rootPath, 'dist'),
  srcPath: srcPath,
  devPublicPath: '/',// 开发环境下publicPath
  prodPublicPath: './', // 生产环境下publicPath
  template: path.join(srcPath, 'index.html'), // 模板入口
  port: 3000 // 前端开发模式下端口
}