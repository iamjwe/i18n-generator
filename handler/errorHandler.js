const { argumentErrorPrint, configFileNotFoundErrorPrint, configParseErrorPrint, initConfigFileErrorPrint } = require("./printHandler");

exports.argumentErrorHanler = () => {
  argumentErrorPrint();
  process.exit(-1);
}

exports.configFileNotFoundErrorHandler = () => {
  configFileNotFoundErrorPrint();
  process.exit(-1);
}

exports.configParseErrorHandler = () => {
  configParseErrorPrint();
  process.exit(-1);
}

exports.initConfigFileErrorHandler =() => {
  initConfigFileErrorPrint();
  process.exit(-1);
}

exports.readMdErrorHandler =() => {
  console.log('生成资源文件时，markdown读取错误');
  process.exit(-1);
}

exports.parseMdErrorHandler =() => {
  console.log('生成资源文件时，markdown解析错误');
  process.exit(-1);
}

exports.writeLocalesErrorHandler =() => {
  console.log('生成资源文件时，code写入错误');
  process.exit(-1);
}

exports.readLocalesResourceErrorHandler =() => {
  console.log('生成引入文件时，读取资源文件错误');
  process.exit(-1);
}

exports.wirteLocalesImportFileErrorHandler =() => {
  console.log('生成引入文件时，写入资源引入错误');
  process.exit(-1);
}