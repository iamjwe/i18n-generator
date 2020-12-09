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