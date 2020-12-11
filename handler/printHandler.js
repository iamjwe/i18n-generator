const { helpMessage} = require('../const');


const helpPrint = () => {
  console.log(helpMessage);
}

const argumentErrorPrint = () => {
  console.error('参数错误');
}

const configFileNotFoundErrorPrint = () => {
  console.error("当前路径下没有找到 i18n.config.json 配置文件，您可以选择输入 i18n init快速生成配置文件");
}

const configParseErrorPrint = () => {
  console.error("配置文件解析错误，请检查");
}

const initConfigFileErrorPrint =() => {
  console.error("初始化配置文件错误");
}

module.exports = {helpPrint, argumentErrorPrint, configFileNotFoundErrorPrint, configParseErrorPrint, initConfigFileErrorPrint}