// 所有任务
exports.TASK = {
  EXTRA: Symbol(),  // 提取任务
  TRANSLATE: Symbol(),
  GENERATOR: Symbol()
}

exports.mdFileReg = /.md/;
exports.jsFileReg = /.js$/;

exports.configFileName = 'i18n.config.json';


exports.enDirName = 'en-US';
exports.zhDirName = 'zh-CN';
exports.enUSFileName = 'en-US.js';
exports.zhCNFileName = 'zh-CN.js';

exports.helpMessage = `
| 参数名      | 参数意义                                                     |
| ------      | ------------------------------------------------------------ |
| help        | 输出这张表格                                                 |
| init        | 初始化配置文件                                               |
| task -e     | 执行EXTRA提取任务                                            |
| task -t     | 执行TRANSLATE翻译任务                                        |
| task -g     | 执行GENERATOR生成任务                                        |
| task -et    | 先EXTRA提取，再TRANSLATE翻译任务                             |
| task -tg    | 先TRANSLATE翻译任务，再GENERATOR生成任务                     |
| task -etg   | 先EXTRA提取，再TRANSLATE翻译任务，最后GENERATOR生成任务      |
`;
