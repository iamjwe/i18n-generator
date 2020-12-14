const { extraWordsByContext } = require("../sdk/extra");
const { insertColumn } = require("../sdk/markdown");
const { readFileUtf8, writeFile } = require("../utils/fileUtils");

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  // 读取
  const context = readFileUtf8(fromCodeFilePath);
  let mdContent = readFileUtf8(toMdFilePath);
  // 提取 + 添加
  rules.forEach((rule) => {
    const columnName = rule.columnName;
    const words = extraWordsByContext(context, rule.sentenceReg, rule.wordsReg, rule.wordsRegIndex);
    mdContent = insertColumn(mdContent, {columnHead: columnName, columnData: words});
  })
  // 写入
  writeFile(toMdFilePath, mdContent);
}

