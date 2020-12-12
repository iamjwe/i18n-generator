const lodash = require('lodash');
const {readMd, parseMd, wirteLocalesResource, readLocalesResource, wirteLocalesImportFile} = require('../taskIO/generator');


exports.generatorResourceJs = (mdPath, enDir, zhDir) => {
  // wirteLocales函数柯里化
  const curriedWirteLocalesResource = lodash.curry(wirteLocalesResource, 3);
  // 函数组合
  return lodash.flowRight(curriedWirteLocalesResource(enDir, zhDir), parseMd, readMd)(mdPath);
}

exports.generatorResourceImportJs = (enDir, zhDir, enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile) => {
  const fileNameArrMap = readLocalesResource(enDir, zhDir);
  return wirteLocalesImportFile(enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile, fileNameArrMap);
}
