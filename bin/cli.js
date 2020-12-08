#!/usr/bin/env node
// 负责命令解析以及任务分发，分发后由taskHandler中的具体handler处理处理
const { TASK, argvTaskMap } = require('../const');
const { taskExtra } = require('../taskHandler/extra');
const { taskTranslate } = require('../taskHandler/translate');
const { taskGenerator } = require('../taskHandler/generator');
const { initConfig } = require('../taskHandler/init');
const { helpPrint } = require('../handler/printHandler');
const { argumentErrorHanler } = require('../handler/errorHandler');
const { readConfig } = require('../helper/readConfig');

const destDir = process.cwd();
const argv = process.argv.slice(2);
if (argv.length === 0 || argv[0] === '-help') {
  // 无参数以及-help参数都会打印help信息
  helpPrint();
  process.exit(1);
} else if (argv[0] === 'init') {
  initConfig(destDir);
  process.exit(1);
}

// 进入任务处理
const taskQueue = argvTaskMap[argv[0]];
const config = readConfig(destDir);

if (!taskQueue) {
  argumentErrorHanler();
}

// 任务执行器
const taskRunner = (taskType) => {
  switch (taskType) {
    case TASK.EXTRA:
      return taskExtra(config.extra);
    case TASK.TRANSLATE:
      return taskTranslate(config.translate);
    case TASK.GENERATOR:
      return taskGenerator(config.generator);
  }
}

// 异步任务迭代器:递归实现异步任务队列调用
let queuePointer = 0;
const taskIteratorAsync = () => {
  if (queuePointer === taskQueue.length) {
    return
  }
  taskRunner(taskQueue[queuePointer]).then(() => {
    queuePointer++;
    taskIteratorAsync();
  })
}

taskIteratorAsync();