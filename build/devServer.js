const express = require('express');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const compiler = require('webpack')(require('./webpack/webpack.dev'));
const app = express();
const { watchMock } = require('./script/mock');

watchMock();

// EventSource的response
let client;

// webpack配置
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.devPublicPath,
  logLevel: 'info',
  writeToDisk: true
});
app.use(devMiddleware);

compiler.hooks.done.tap('reload', function () {
  client.write('data: ' + 'reload' + '\n\n');
}.bind(this));

// EventSource
app.use('/__reload__', function (req, res) {
  client = res;
  client.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
});

app.get('*', function (req, res) {
  res.end(fs.readFileSync(path.join(config.output, 'index.html')));
})

app.listen(config.port, () => {
  // 打开浏览器
  require('open')(`http://localhost:${config.port}`);
});
