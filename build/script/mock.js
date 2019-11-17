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
  const { IApi } = await tsFaker(files, { locale: 'zh_CN', ignoreErrors: true }, (name, schema) => {
    if (name !== 'IApi') {
      return schema;
    }
    const method = ['get', 'put', 'delete', 'post'];
    try {
      for (k in schema.properties) {
        method.forEach((m) => {
          if(schema.properties[k].properties[m]) {
            schema.properties[k].properties[m] = schema.properties[k].properties[m].properties.response;
          }
        });
      }
    } catch (ex) {
      //
    }
    return schema;
  });
  fs.writeFileSync(path.resolve(config.srcPath, 'mock/data.json'), JSON.stringify(IApi, null, 2));
}

module.exports = {
  genMock,
  watchMock
};