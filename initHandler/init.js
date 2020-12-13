const { configFileName } = require('../const');
const { readFileBuffer, writeFile } = require("../utils/fileUtils");
const { getPathConcat } = require("../utils/pathUtils");
const { initConfigFileErrorHandler } = require('../handler/errorHandler');

const initConfig = (workDir) => {
  try {
    const configTpPath = getPathConcat(__dirname, `../templates/${configFileName}`);
    const configTp = readFileBuffer(configTpPath);
    const targetConfigPath = getPathConcat(workDir, configFileName);
    writeFile(targetConfigPath, configTp);
  } catch {
    initConfigFileErrorHandler();
  }
}

module.exports = { initConfig }