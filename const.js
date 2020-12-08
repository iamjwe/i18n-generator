// 所有任务
const TASK = {
  EXTRA: Symbol(),  // 提取任务
  TRANSLATE: Symbol(),
  GENERATOR: Symbol()
}
// 参数与任务之间的映射表
const argvTaskMap = {
  '-help': Symbol(),
  '-e': [TASK.EXTRA],
  '-t': [TASK.TRANSLATE],
  '-g': [TASK.GENERATOR],
  '-et': [TASK.EXTRA, TASK.TRANSLATE],
  '-tg': [TASK.TRANSLATE, TASK.GENERATOR],
  '-etg': [TASK.EXTRA, TASK.TRANSLATE, TASK.GENERATOR],
}

const testConfig = {
  extra: {
    codePath:'xxx',
    markdownPath:'ooo',
  },
  translate: {
    markdownPath:'ooo',
  },
  generator: {
    markdownPath:'ooo',
    localePath: 'lll'
  }
}

module.exports = {TASK, argvTaskMap, testConfig}