const { extraWordsByContext } = require("../sdk/extra");
const { insertColumn } = require("../sdk/markdown");
const { readFileUtf8, writeFile } = require("../utils/fileUtils");

exports.extraIO = (fromCodeFilePath, toMdFilePath, rules) => {
  const context = readFileUtf8(fromCodeFilePath);
  let mdContent = readFileUtf8(toMdFilePath);
  rules.forEach((rule) => {
    const columnName = rule.columnName;
    const words = extraWordsByContext(context, rule.sentenceReg, rule.wordsReg, rule.wordsRegIndex);
    mdContent = insertColumn(mdContent, {columnHead: columnName, columnData: words});
  })
  writeFile(toMdFilePath, mdContent);
}

