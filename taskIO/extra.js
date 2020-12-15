const { extraWordsByContext } = require("../sdk/extra");
const { insertColumn } = require("../sdk/markdown");
const { readFileUtf8, writeFile, createFile } = require("../utils/fileUtils");

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  // 读取
  const context = readFileUtf8(fromCodeFilePath);
  let content = '';
  // 提取 + 添加
  rules.forEach((rule) => {
    const columnName = rule.columnName;
    const words = extraWordsByContext(context, rule.sentenceReg, rule.wordsReg, rule.wordsRegIndex);
    content = insertColumn(content, {columnHead: columnName, columnData: words});
  })
  // 写入
  if (content) {
    writeFile(createFile(toMdFilePath), content);
  }
}

