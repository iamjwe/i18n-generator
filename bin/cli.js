#!/usr/bin/env node
const { TASK } = require('../const');
const { initConfig } = require('../initHandler/init');
const { helpPrint } = require('../handler/printHandler');
const { argumentErrorHanler } = require('../handler/errorHandler');
const { tasksLauncher } = require('../taskLauncher/launch');

// 获取用户输入的路径
const workDir = process.cwd();
// 获取用户输入的任务和参数
const argv = process.argv.slice(2);

// 无参时默认执行help
if (argv.length === 0) {
  argv.push("help");
}

// 解析第一个参数
const argv1Handler = (argv1) => {
  switch(argv1) {
    case 'init':
      initConfig(workDir);
      process.exit(1);
    case 'help':
      helpPrint();
      process.exit(1);
    case 'task':
    case 'tasks':
      break;
    default:
      argumentErrorHanler();// 内部process.exit(-1);
  }
}
// 解析第二个参数
const argv2Handler = (argv2) => {
  let taskQueue;
  switch(argv2) {
    case '-e':
      taskQueue = [TASK.EXTRA];
      break;
    case '-t':
      taskQueue = [TASK.TRANSLATE];
      break;
    case '-g':
      taskQueue = [TASK.GENERATOR];
      break;
    case '-et':
      taskQueue = [TASK.EXTRA, TASK.TRANSLATE];
      break;
    case '-eg':
      taskQueue = [TASK.EXTRA, TASK.GENERATOR];
      break;
    case '-tg':
      taskQueue = [TASK.TRANSLATE, TASK.GENERATOR];
      break;
    case '-etg':
      taskQueue = [TASK.EXTRA, TASK.TRANSLATE, TASK.GENERATOR];
      break;
    default:
      argumentErrorHanler();// 内部process.exit(-1);
  }
  return taskQueue;
}

argv1Handler(argv[0]);
const taskQueue = argv2Handler(argv[1]);

// 进入任务处理
tasksLauncher(taskQueue, workDir);