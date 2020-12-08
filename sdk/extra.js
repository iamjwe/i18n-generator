#!/usr/bin/env node

const taskExtra = (config) => {
  return new Promise((resolve, reject) => {
    console.log('extra');
    console.log('config', config);
    setTimeout(() => {
      resolve()
    },1000)
  })
}

module.exports = { taskExtra }