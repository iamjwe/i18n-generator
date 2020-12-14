const { convert2ColumnToResourceJsStr, insertToResImpAndExp } = require("../sdk/generator");
const { selectColumn } = require("../sdk/markdown");
const { readFileUtf8, writeFile, createFile } = require("../utils/fileUtils");


exports.generatorResourceFileIO = (mdFilePath, keyColumnIndex, valColumnIndex, resFilePath) => {
  // 读取
  const content = readFileUtf8(mdFilePath);
  // 查询
  const keyColumnObj = selectColumn(content, keyColumnIndex);
  const valColumnObj = selectColumn(content, valColumnIndex);
  // 转换
  const resourceJsStr = convert2ColumnToResourceJsStr(keyColumnObj.columnData, valColumnObj.columnData);
  // 写入
  writeFile(createFile(resFilePath), resourceJsStr);
}

exports.generatorResImpAndExpFileIO = (resImpAndExpFilePath, resFileName, relativeResFilePath) => {
  // 读取
  const oldContent = readFileUtf8(resImpAndExpFilePath);
  // 转换
  const newContent = insertToResImpAndExp(oldContent, resFileName, relativeResFilePath)
  // 写入
  writeFile(resImpAndExpFilePath, newContent)
}