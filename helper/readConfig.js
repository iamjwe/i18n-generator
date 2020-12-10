const { configFileName } = require('../const');
const fs = require('fs');
const path = require('path');
const { configFileNotFoundErrorHandler, configParseErrorHandler } = require('../handler/errorHandler');

exports.readConfig = (destDir) => {
  const configFilePath = path.join(destDir, configFileName);
  // 检查文件是否存在
  if (!fs.existsSync(configFilePath)) {
    configFileNotFoundErrorHandler();
  }
  const content = fs.readFileSync(configFilePath);
  // 提取文件内容
  try {
    const config = JSON.parse(content);
    return config
  } catch {
    configParseErrorHandler();
  }
};