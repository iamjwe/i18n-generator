const { argumentErrorPrint, configFileNotFoundErrorPrint, configParseErrorPrint, initConfigFileErrorPrint } = require("./printHandler");

exports.argumentErrorHanler = (e) => {
  argumentErrorPrint();
  process.exit(-1);
}

exports.configFileNotFoundErrorHandler = (e) => {
  configFileNotFoundErrorPrint(e);
  process.exit(-1);
}

exports.configParseErrorHandler = (e) => {
  configParseErrorPrint();
  process.exit(-1);
}

exports.initConfigFileErrorHandler =(e) => {
  initConfigFileErrorPrint();
  process.exit(-1);
}

exports.readMdErrorHandler =(e) => {
  console.log('生成资源文件时，markdown读取错误');
  process.exit(-1);
}

exports.parseMdErrorHandler =(e) => {
  console.log('生成资源文件时，markdown解析错误');
  process.exit(-1);
}

exports.writeLocalesErrorHandler =(e) => {
  console.log('生成资源文件时，code写入错误');
  process.exit(-1);
}

exports.readLocalesResourceErrorHandler =(e) => {
  console.log('生成引入文件时，读取资源文件错误');
  process.exit(-1);
}

exports.wirteLocalesImportFileErrorHandler =(e) => {
  console.log('生成引入文件时，写入资源引入错误');
  process.exit(-1);
}

exports.mdPathNotExistErrorHandler =(e) => {
  console.log('markdown文件/文件夹不存在');
  process.exit(-1);
}

exports.extraLangKeyErrorHandler = (e) => {
  console.log('从代码中提取语言键错误');
  console.log(e.message);
  process.exit(-1);
}