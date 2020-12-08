const { argumentErrorPrint, configFileNotFoundErrorPrint, configParseErrorPrint, initConfigFileErrorPrint } = require("./printHandler");

const argumentErrorHanler = () => {
  argumentErrorPrint();
  process.exit(-1);
}

const configFileNotFoundErrorHandler = () => {
  configFileNotFoundErrorPrint();
  process.exit(-1);
}

const configParseErrorHandler = () => {
  configParseErrorPrint();
  process.exit(-1);
}

const initConfigFileErrorHandler =() => {
  initConfigFileErrorPrint();
  process.exit(-1);
}

module.exports = { argumentErrorHanler, configFileNotFoundErrorHandler, configParseErrorHandler, initConfigFileErrorHandler}