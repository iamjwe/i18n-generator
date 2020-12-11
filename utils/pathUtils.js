const p = require('path');
const fs = require('fs');

exports.getPathAbsolute = (pathR) => {
  const workDir = process.cwd();
  if (pathR === '.') {
    return workDir
  } else {
    return p.join(workDir, pathR);
  }
}

exports.getPathConcat = (path1, path2) => {
  return p.join(path1, path2);
}

exports.getSliceBasePath = (path, basepath) => {
  return path.split(basepath + '\\')[1];
}

exports.getPathType = (path) => {
  return fs.statSync(path).isDirectory() ? 'dir' : 'file';
}

exports.getUpperDirPath = (path) => {
  return p.dirname(path);
}

exports.getFileNameFromPath = (path) => {
  return p.basename(path);
}

exports.getDirNameFromPath = (path) => {
  return p.basename(path);
}

exports.getFileSuffix = (fileName) => {
  //TODO  修改为第一个.之后的内容即视为后缀
  return fileName.match(/\.(.+)$/)[1];
}