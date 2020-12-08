const { configFileName } = require('../const');
const fs = require('fs');
const path = require('path');
const { initConfigFileErrorHandler } = require('../handler/errorHandler');

const initConfig = (targetDir) => {
  try {
    const configTpPath = path.join(__dirname, "../templates/i18ng.config.json");
    const targetConfigPath = targetDir + '\\' + configFileName;
    const configTp = fs.readFileSync(configTpPath);
    fs.writeFileSync(targetConfigPath, configTp);
  } catch {
    initConfigFileErrorHandler();
  }
}

module.exports = { initConfig }