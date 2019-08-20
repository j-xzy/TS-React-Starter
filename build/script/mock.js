const tsFaker = require('ts-faker').default;
const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const modelPath = path.resolve(config.srcPath, 'interface/model');
const apiPath = path.resolve(config.srcPath, 'interface/api');


function watchMock() {
  genMock();
  chokidar.watch([modelPath, apiPath], { ignoreInitial: true }).on('all', (t, p) => {
    genMock();
  });
}

async function genMock() {
  const files = glob.sync(path.resolve(modelPath, '**/*.ts')).concat(
    glob.sync(path.resolve(apiPath, '**/*.ts'))
  );
  const { IApi } = await tsFaker(files, { locale: 'zh_CN', ignoreErrors: true });
  fs.writeFileSync(path.resolve(config.srcPath, 'mock/data.json'), JSON.stringify(IApi, null, 2));
}

module.exports = {
  genMock,
  watchMock
};