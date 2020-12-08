const helpMessage = `
| 参数名 | 参数意义                           | 使用示例     |
| ------ |      --------------------------    | ------------ |
| -e     | 执行提取任务                       | i18n-g -e    |
| -t     | 执行翻译任务                       | i18n-g -t    |
| -g     | 执行生成任务                       | i18n-g -g    |
| -et    | 先提取，再翻译                     | i18n-g -et   |
| -tg    | 先翻译，再生成                     | i18n-g -tg   |
| -etg   | 先提取，再翻译，最后生成           | i18n-g -etg  |
| -help  | 打印帮助信息                       | i18n-g -help |
`;

const argumentErrorMessage = "参数错误";

module.exports = {helpMessage, argumentErrorMessage}