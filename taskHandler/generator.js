const { generatorResourceJs, generatorResourceImportJs } = require('../taskHelper/generator-helper');

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    const mdPath = config.mdPath;
    const enDir = config.enDir;
    const zhDir = config.zhDir;
    const importDirForEnDirRelavtiveToEnUSFile = config.importDirForEnDirRelavtiveToEnUSFile;
    const importDirForZhDirRelavtiveToZhCNFile = config.importDirForZhDirRelavtiveToZhCNFile;
    const enUSFilePath = config.enUSFilePath;
    const zhCNFilePath = config.zhCNFilePath;
    generatorResourceJs(mdPath, enDir, zhDir);
    generatorResourceImportJs(enDir, zhDir, enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile);
    resolve();
  })
}

module.exports = { taskGenerator }