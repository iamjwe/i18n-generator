const { generatorResourceJs, generatorResourceImportJs } = require('../taskHelper/generator-helper');
const { parsePath }  = require('../utils/utils');
const path = require('path');
const fs = require('fs');

const confirmDirExist = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath,{ recursive: true });// 多级创建
  }
  return dirPath;
}

const confirmFileDirExist = (filePath) => {
  const dirPath = path.dirname(filePath);
  confirmDirExist(dirPath);
  return filePath;
}

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    const mdPath = parsePath(config.mdPath);
    const enDir = confirmDirExist(parsePath(config.enDir));
    const zhDir = confirmDirExist(parsePath(config.zhDir));
    const importDirForEnDirRelavtiveToEnUSFile = config.importDirForEnDirRelavtiveToEnUSFile;
    const importDirForZhDirRelavtiveToZhCNFile = config.importDirForZhDirRelavtiveToZhCNFile;
    const enUSFilePath = confirmFileDirExist(parsePath(config.enUSFilePath));
    const zhCNFilePath = confirmFileDirExist(parsePath(config.zhCNFilePath));
    generatorResourceJs(mdPath, enDir, zhDir);
    generatorResourceImportJs(enDir, zhDir, enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile);
    resolve();
  })
}

module.exports = { taskGenerator }