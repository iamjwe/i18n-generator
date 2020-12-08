const { helpMessage, argumentErrorMessage, configFileNotFoundErrorMessage,  configParseErrorMessage, initConfigFileErrorMessage} = require('../message/message');


const helpPrint = () => {
  console.log(helpMessage);
}

const argumentErrorPrint = () => {
  console.error(argumentErrorMessage);
}

const configFileNotFoundErrorPrint = () => {
  console.error(configFileNotFoundErrorMessage);
}

const configParseErrorPrint = () => {
  console.error(configParseErrorMessage);
}

const initConfigFileErrorPrint =() => {
  console.error(initConfigFileErrorMessage);
}

module.exports = {helpPrint, argumentErrorPrint, configFileNotFoundErrorPrint, configParseErrorPrint, initConfigFileErrorPrint}