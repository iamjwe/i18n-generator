const { generatorResourceJs, generatorResourceImportJs } = require('../taskService/generator');
const { mdPathNotExistErrorHandler } = require('../handler/errorHandler');
const { parsePath } = require('../utils/utils');
const path = require('path');
const fs = require('fs');
const { enDirName, zhDirName, enUSFileName, zhCNFileName } = require('../const')
let rootMdPath;

function deleteDir(path) {
  let files = [];
  if( fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      files.forEach(function(file,index){
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) {
              deleteDir(curPath);
          } else {
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
  }
}

const confirmDirExist = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });// 多级创建
  }
  return dirPath;
}

const confirmFileExist = (filePath) => {
  const dirPath = path.dirname(filePath);
  confirmDirExist(dirPath);
  if (!fs.existsSync(filePath)) {
    fs.openSync(filePath, 'w')
  }
  return filePath;
}

const getDirParseInfo = (mdDir, localesDir) => {
  // 获得相对路径
  const realtiveMdPath = mdDir.split(rootMdPath)[1];
  // dir是绝对路径
  const enDir = confirmDirExist(path.join(localesDir,enDirName + realtiveMdPath));
  const zhDir = confirmDirExist(path.join(localesDir, zhDirName + realtiveMdPath));
  const importDirForEnDirRelavtiveToEnUSFile = `./en-US${realtiveMdPath.replace('\\', '/')}`;
  const importDirForZhDirRelavtiveToZhCNFile = `./zh-CN${realtiveMdPath.replace('\\', '/')}`;
  return {
    mdPath: mdDir, 
    enDir,
    zhDir,
    importDirForEnDirRelavtiveToEnUSFile,
    importDirForZhDirRelavtiveToZhCNFile
  }
}

// 广度优先遍历取得[{mdPathR, enDirR, zhDirR, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile}]
const recursionMdPath = (mdPath, localesDir, dirParseInfoArr) => {
    dirParseInfoArr.push(getDirParseInfo(mdPath, localesDir));
    const dirs = fs.readdirSync(mdPath).filter((item) => {
      const statObj = fs.statSync(path.join(mdPath, item));
      return statObj.isDirectory(mdPath)
    });
    dirs.forEach((dir) => {
      recursionMdPath(path.join(mdPath, dir), localesDir, dirParseInfoArr)
    })
}

// 判断路径类型，是一个md文件或一个md文件夹
const getDirParseInfoArr = (mdPath, localesDir) => {
  let dirParseInfoArr = [];
  if (!fs.existsSync(mdPath)) {
    mdPathNotExistErrorHandler();
  }
  let statObj = fs.statSync(mdPath);
  if (statObj.isDirectory(mdPath)) {
    recursionMdPath(mdPath, localesDir, dirParseInfoArr);
  } else {
    dirParseInfoArr.push(getDirParseInfo(mdPath, localesDir));
  }
  return dirParseInfoArr
}

const taskGenerator = (config) => {
  return new Promise((resolve, reject) => {
    // 先把locales删掉
    deleteDir(parsePath(config.localesDir));
    // 生成locales结构
    const enUSFilePath = confirmFileExist(parsePath(path.join(config.localesDir, enUSFileName)));
    const zhCNFilePath = confirmFileExist(parsePath(path.join(config.localesDir, zhCNFileName)));
    const mdPath = parsePath(config.mdPath);
    rootMdPath = mdPath;
    const localesDir = confirmDirExist(parsePath(config.localesDir));
    const dirParseInfoArr = getDirParseInfoArr(mdPath, localesDir);
    dirParseInfoArr.forEach((dirInfo) => {
      generatorResourceJs(dirInfo.mdPath, dirInfo.enDir, dirInfo.zhDir);
      generatorResourceImportJs(dirInfo.enDir, dirInfo.zhDir, enUSFilePath, zhCNFilePath, dirInfo.importDirForEnDirRelavtiveToEnUSFile, dirInfo.importDirForZhDirRelavtiveToZhCNFile);
    })
    resolve();
  })
}

module.exports = { taskGenerator }