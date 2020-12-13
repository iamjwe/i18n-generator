// 所有任务
exports.TASK = {
  EXTRA: Symbol(),  // 提取任务
  TRANSLATE: Symbol(),
  GENERATOR: Symbol()
}

// 配置文件名称
exports.configFileName = 'i18n.config.json';

// 帮助信息
exports.helpMessage = `
| 参数名      | 参数意义                                                     |
| ------      | ------------------------------------------------------------ |
| help        | 输出这张表格                                                 |
| init        | 初始化配置文件                                               |
| task -e     | 执行EXTRA提取任务                                            |
| task -t     | 执行TRANSLATE翻译任务                                        |
| task -g     | 执行GENERATOR生成任务                                        |
| task -et    | 先EXTRA提取，再TRANSLATE翻译                                 |
| task -eg    | 先EXTRA提取，再GENERATOR生成                                 |
| task -tg    | 先TRANSLATE翻译任务，再GENERATOR生成                         |
| task -etg   | 先EXTRA提取，再TRANSLATE翻译，最后GENERATOR生成              |
`;
