// 所有任务
const TASK = {
  EXTRA: Symbol(),  // 提取任务
  TRANSLATE: Symbol(),
  GENERATOR: Symbol()
}
exports.TASK = TASK;
// 参数与任务之间的映射表
exports.argvTaskMap = {
  '-help': Symbol(),
  '-e': [TASK.EXTRA],
  '-t': [TASK.TRANSLATE],
  '-g': [TASK.GENERATOR],
  '-et': [TASK.EXTRA, TASK.TRANSLATE],
  '-tg': [TASK.TRANSLATE, TASK.GENERATOR],
  '-etg': [TASK.EXTRA, TASK.TRANSLATE, TASK.GENERATOR],
}

exports.mdFileReg = /.md/;
exports.jsFileReg = /.js$/;

exports.configFileName = 'i18n.config.json';


exports.enDirName = 'en-US';
exports.zhDirName = 'zh-CN';
exports.enUSFileName = 'en-US.js';
exports.zhCNFileName = 'zh-CN.js';
