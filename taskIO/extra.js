const { extraSentencesByContext, extraWordsBySentence } = require("../sdk/extra");
const { insertRowByPrimaryLimit, initMdTableStrByHeadArr } = require("../sdk/markdown");
const { readFileUtf8, writeFile, createFile } = require("../utils/fileUtils");

const parseColumnInfo = (rules) => {
  let headNameArr = [];
  let primaryIndexArr = [];
  rules.columnInfo.forEach((rule, index) => {
    headNameArr.push(rule.name)
    if (rule.isPrimary) {
      primaryIndexArr.push(index);
    }
  })
  return { headNameArr, primaryIndexArr };
}

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  console.log(fromCodeFilePath);
  ('-------------------------------------------------------------------------');
  // 读取
  const context = readFileUtf8(fromCodeFilePath);
  // 构造内容
  const columnInfo = parseColumnInfo(rules);
  let content = initMdTableStrByHeadArr(columnInfo.headNameArr);
  const primaryIndexArr = columnInfo.primaryIndexArr;
  rules.rowData.forEach((row) => {
    let sentences = extraSentencesByContext(context, row.sentenceReg);
    if (sentences!==null) {
      sentences.forEach((sentence) => {
        let rowData = [];
        row.element.forEach((ele) => {
          rowData[ele.columnNum-1] = extraWordsBySentence(sentence, ele.wordsReg, ele.wordsRegIndex)
        })
        console.log(sentence);
        console.log(rowData);
        content = insertRowByPrimaryLimit(content, rowData, primaryIndexArr);
      })
    }
  })
  // 写入
  writeFile(createFile(toMdFilePath), content);
  console.log('-------------------------------------------------------------------------');
}

