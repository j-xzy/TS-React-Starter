const { genMock } = require('./mock');

console.log('正在生成mock数据...');
genMock().then(() => {
  console.log('mock数据生成完成');
});