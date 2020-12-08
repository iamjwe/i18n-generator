#!/usr/bin/env node

const { TASK, argvTaskMap, testConfig } = require('../const');
const { taskExtra } = require('../sdk/extra');
const { taskTranslate } = require('../sdk/translate');
const { taskGenerator } = require('../sdk/generator');
const { helpHandler, argumentErrorHanler } = require('../utils/commandHandler');

const argv = process.argv.slice(2);
let taskQueue;
if (argv.length === 0 || argv[0]=== '-help') {
  // 无参数以及-help参数都会打印help信息
  helpHandler();
  process.exit(1);
} else {
  // 有参数，根据参数获取任务队列
  taskQueue = argvTaskMap[argv[0]];
}
if (!taskQueue) {
  argumentErrorHanler();
  process.exit(-1);
}

// 任务执行器
const taskRunner = (taskType) => {
  switch (taskType) {
    case TASK.EXTRA:
      return taskExtra(testConfig.extra);
    case TASK.TRANSLATE:
      return taskTranslate(testConfig.translate);
    case TASK.GENERATOR:
      return taskGenerator(testConfig.generator);
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