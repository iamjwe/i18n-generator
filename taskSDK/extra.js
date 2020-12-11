
const { extraLangKeyErrorHandler } = require('../handler/errorHandler');
// 从一段字符串中取出符合正则规则的键
exports.extraLangKey = (content, languageVariableReg, languageKeyReg, regKeyIndex) => {
  // TODO 异常处理
  try {
    const keyArr = [];
    const languageVariableArr = content.match(languageVariableReg);
    languageVariableArr.forEach(languageVariable => {
      keyArr.push(languageVariable.match(languageKeyReg)[regKeyIndex])
    })
    return keyArr;
  } catch(e) {
    extraLangKeyErrorHandler(e);
  }
}

// 将字符串数组转换为md表格字符串(第一列)
exports.convertStrArrToMdTableStr = (strArr, columnName) => {
  let mdTableStr = '';
  mdTableStr += `| ${columnName} |\n`;// 添加表头
  mdTableStr += '| ---- |\n';// 添加|---|
  strArr.forEach((str) => {
    mdTableStr += `|  ${str}  |\n`;
  })
  return mdTableStr;
}


