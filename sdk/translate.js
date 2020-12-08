#!/usr/bin/env node

// 不询问，采取配置文件的形式

const taskTranslate = (config) => {
  return new Promise((resolve, reject) => {
    console.log('translate');
    console.log('config', config);
    setTimeout(() => {
      resolve()
    },2000)
  })
}

module.exports = { taskTranslate }