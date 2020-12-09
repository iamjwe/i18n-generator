const { generatorResourceJs, generatorResourceImportJs } = require('../taskHelper/generator-helper');
const { parsePath }  = require('../utils/utils');

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    const mdPath = parsePath(config.mdPath);
    const enDir = parsePath(config.enDir);
    const zhDir = parsePath(config.zhDir);
    const importDirForEnDirRelavtiveToEnUSFile = config.importDirForEnDirRelavtiveToEnUSFile;
    const importDirForZhDirRelavtiveToZhCNFile = config.importDirForZhDirRelavtiveToZhCNFile;
    const enUSFilePath = parsePath(config.enUSFilePath);
    const zhCNFilePath = parsePath(config.zhCNFilePath);
    generatorResourceJs(mdPath, enDir, zhDir);
    generatorResourceImportJs(enDir, zhDir, enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile);
    resolve();
  })
}

module.exports = { taskGenerator }