const { extraSentencesByContext, extraWordsBySentence } = require("../sdk/extra");
const { insertColumn, insertRowByDistinctLimit, initMdTableStrByHeadRow } = require("../sdk/markdown");
const { readFileUtf8, writeFile, createFile } = require("../utils/fileUtils");

const getHeadRowByRules = (rules) => {
  let row = [];
  rules.forEach((rule) => {
    row.push(rule.columnName);
  })
  return row;
}

const getDistinctIndexArrByRules = (rules) => {
  let distinctIndexArr = [];
  rules.forEach((rule, index) => {
    if (rule.isDistinct) {
      distinctIndexArr.push(index);
    }
  })
  return distinctIndexArr;
}

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  // 读取
  const context = readFileUtf8(fromCodeFilePath);
  // 构造内容
  let content = initMdTableStrByHeadRow(getHeadRowByRules(rules));
  const distinctIndexArr = getDistinctIndexArrByRules(rules);
  let sentences = extraSentencesByContext(context, rules[0].sentenceReg);
  if (sentences!==null) {
    sentences.forEach((sentence) => {
      let rowData = [];
      rules.forEach((rule) => {
        rowData.push(extraWordsBySentence(sentence, rule.wordsReg, rule.wordsRegIndex));
      })
      content = insertRowByDistinctLimit(content, rowData, distinctIndexArr);
    })
  }
  // 写入
  writeFile(createFile(toMdFilePath), content);
}

