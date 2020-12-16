const { generatorService } = require('../taskService/generator');
const { getPathAbsolute } = require('../utils/pathUtils');

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    const fromMarkdown = config.fromMarkdown.map((mdPath) => {
      return getPathAbsolute(mdPath)
    })
    const toLocales = getPathAbsolute(config.toLocales);
    const rules = config.rules;
    generatorService(fromMarkdown, toLocales, rules);
    resolve();
  })
}

module.exports = { taskGenerator }