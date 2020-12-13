const { TASK, configFileName } = require('../const');
const { taskExtra } = require('../taskController/extra');
const { taskTranslate } = require('../taskController/translate');
const { taskGenerator } = require('../taskController/generator');
const { configFileNotFoundErrorHandler, configParseErrorHandler } = require('../handler/errorHandler');
const { readJsonFile, isPathExist } = require('../utils/fileUtils');
const { getPathConcat } = require('../utils/pathUtils');

// 读取配置文件
const readJsonConfig = (workDir) => {
  const configFilePath = getPathConcat(workDir, configFileName);
  if (!isPathExist(configFilePath)) {
    configFileNotFoundErrorHandler();
  }
  try {
    const jsonObj = readJsonFile(configFilePath);
    return jsonObj
  } catch(e) {
    configParseErrorHandler(e);
  }
};

// 单任务分配器：分配到对应的taskController
const taskGo = (taskType, config) => {
  switch (taskType) {
    case TASK.EXTRA:
      return taskExtra(config.extra);
    case TASK.TRANSLATE:
      return taskTranslate(config.translate);
    case TASK.GENERATOR:
      return taskGenerator(config.generator);
  }
}

// 异步任务迭代器
exports.tasksLauncher = (taskQueue, workDir) => {
  const config = readJsonConfig(workDir);
  let queuePointer = 0;
  const taskIteratorAsync = () => {
    if (queuePointer === taskQueue.length) {
      return
    }
    taskGo(taskQueue[queuePointer], config).then(() => {
      queuePointer++;
      taskIteratorAsync();
    })
  }
  return taskIteratorAsync();
}



