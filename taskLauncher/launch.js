const { TASK } = require('../const');
const { taskExtra } = require('../taskController/extra');
const { taskTranslate } = require('../taskController/translate');
const { taskGenerator } = require('../taskController/generator');

// 单任务分配器
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
exports.tasksLauncher = (taskQueue, config) => {
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



