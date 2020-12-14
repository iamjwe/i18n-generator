const { generatorService } = require('../taskService/generator');
const { getPathAbsolute } = require('../utils/pathUtils');

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    config.mdPath = getPathAbsolute(config.markdownPath);
    config.resPath = getPathAbsolute(config.resourcePath);
    const rules = config.generatorRule;
    generatorService(config.mdPath, config.resPath, rules);
    resolve();
  })
}

module.exports = { taskGenerator }