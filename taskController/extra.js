const { extraService } = require('../taskService/extra');
const { getPathAbsolute } = require('../utils/pathUtils');

// 负责请求（命令）预处理（用户输入、配置信息）
const taskExtra = (config) => {
  return new Promise((resolve, reject) => {
    config.codePath.path = getPathAbsolute(config.codePath.path);
    config.codePath.suffixs = config.codePath.suffixs.map((strReg) => {
      return eval(strReg);
    });
    config.markdownPath = getPathAbsolute(config.markdownPath);
    config.rules = config.rules.map((rule) => {
      return {
        ...rule,
        sentenceReg: eval(rule.sentenceReg),
        wordsReg: eval(rule.wordsReg),
      }
    })
    extraService(config.codePath.path, config.codePath.suffixs, config.markdownPath, config.rules);
    resolve();
  })
}

module.exports = { taskExtra }