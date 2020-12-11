const fs = require('fs');
const path = require('path');

exports.getAllDirNameRecursion = (dirPath) => {
  const rootPath = dirPath;
  const dirPathArr = [];
  const recursion = (dirPath, dirPathArr) => {
    dirPathArr.push(dirPath);
    const dirs = fs.readdirSync(dirPath).filter((item) => {
      const statObj = fs.statSync(path.join(dirPath, item));
      return statObj.isDirectory()
    });
    dirs.forEach((dir) => {
      recursion(path.join(rootPath, dir), dirPathArr)
    })
  }
  recursion(dirPath, dirPathArr);
  return dirPathArr;
}

exports.readFileUtf8 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

exports.writeFile = (filePath, content) => {
  return fs.writeFileSync(filePath, content);
}

const deleteDir = (dirPath) => {
  let files = [];
  if( fs.existsSync(dirPath) ) {
      files = fs.readdirSync(dirPath);
      files.forEach(function(file,index){
          let curPath = dirPath + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteDir(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(dirPath);
  }
}

exports.deleteDir = deleteDir;

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });// 多级创建
  }
  return dirPath;
}
exports.createDir = createDir;

exports.createFile = (filePath) => {
  const dirPath = path.dirname(filePath);
  createDir(dirPath);
  if (!fs.existsSync(filePath)) {
    fs.openSync(filePath, 'w')
  }
  return filePath;
}

exports.getFilesPathArrByDir = (dirPath) => {
  let filesPathArr = [];
  const files = fs.readdirSync(dirPath).filter((item) => {// 过滤文件夹
    const statObj = fs.statSync(path.join(dirPath, item));
    return !statObj.isDirectory()
  });
  files.forEach((file) => {
    filesPathArr.push(path.join(dirPath, file));
  })
  return filesPathArr;
}


