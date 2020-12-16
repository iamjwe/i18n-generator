const { extraService } = require('../taskService/extra');
const { getPathAbsolute, getPathConcat } = require('../utils/pathUtils');

const convertFromCodeConfig = (fromCode) => {
  if (typeof fromCode === 'string') {
    return getPathAbsolute(fromCode);
  }
  if (Array.isArray(fromCode)) {
    const newFromCode = fromCode;
    fromCode.forEach((codeItem, index) => {
      if (typeof codeItem === 'string') {
        fromCode[index] = getPathAbsolute(codeItem);
      }
      if (typeof codeItem === 'object') {
        const basePath = getPathAbsolute(codeItem.path);
        newFromCode[index] = {
          ...codeItem,
          path: basePath,
          excluded: codeItem.excluded.map((exclud) => {
            return getPathConcat(basePath, exclud)
          }),
          suffixs: codeItem.suffixs.map((strReg) => {
            return eval(strReg);
          }),
          notSuffixs: codeItem.notSuffixs.map((strReg) => {
            return eval(strReg);
          })
        }
      }
    })
    return newFromCode
  }
}

const convertRulesConfig = (rules) => {
  rules.rowData = rules.rowData.map((item) => {
    return {
      sentenceReg: eval(item.sentenceReg),
      element: item.element.map((ele) => {
        return {
          ...ele,
          wordsReg: eval(ele.wordsReg)
        }
      })
    }
  })
  return rules
}

// 负责请求（命令）预处理（用户输入、配置信息）
const taskExtra = (config) => {
  return new Promise((resolve, reject) => {
    const fromCode = convertFromCodeConfig(config.fromCode);
    const markdownPath = getPathAbsolute(config.toMarkdown);
    const rules = convertRulesConfig(config.rules);
    extraService(fromCode, markdownPath, rules);
    resolve();
  })
}

module.exports = { taskExtra }