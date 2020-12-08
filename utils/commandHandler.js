const { helpMessage, argumentErrorMessage } = require('../message/message');
const helpHandler = () => {
  console.error(helpMessage);
}

const argumentErrorHanler = () => {
  console.error(argumentErrorMessage);
}

module.exports = {helpHandler, argumentErrorHanler}