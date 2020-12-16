const { extraService } = require('../taskService/extra');
const { getPathAbsolute, getPathConcat } = require('../utils/pathUtils');

// 负责请求（命令）预处理（用户输入、配置信息）
const taskExtra = (config) => {
  return new Promise((resolve, reject) => {
    if (typeof config.codePath.path === 'string') {
      // a file or a dir
      config.codePath.path = getPathAbsolute(config.codePath.path);
    } else {
      // 数组
      config.codePath.path = config.codePath.path.map((path) => {
        if (typeof path === 'string') {
          return getPathAbsolute(path);
        } else {
          const base = getPathAbsolute(path.base);
          const excluded = path.excluded.map((exclud) => {
            return getPathConcat(base, exclud)
          })
          return {base, excluded};
        }
      })
    }
    config.codePath.suffixs = config.codePath.suffixs.map((strReg) => {
      return eval(strReg);
    });
    config.codePath.notSuffixs = config.codePath.notSuffixs.map((strReg) => {
      return eval(strReg);
    });
    config.markdownPath = getPathAbsolute(config.markdownPath);
    config.rules = config.rules.map((rule) => {
      return {
        ...rule,
        sentenceReg: eval(rule.sentenceReg),
        wordsReg: eval(rule.wordsReg),
        isDistinct: rule.isDistinct ? true : false,
      }
    })
    extraService(config.codePath.path, config.codePath.suffixs, config.codePath.notSuffixs, config.markdownPath, config.rules);
    resolve();
  })
}

module.exports = { taskExtra }