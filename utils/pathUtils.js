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

exports.getFileNameFromPath = (filePath) => {
  return p.basename(filePath);
}

exports.getDirNameFromPath = (dirPath) => {
  return p.basename(dirPath);
}

exports.getFileSuffix = (fileName) => {
  return fileName.match(/(\..+)$/)[1];
}

exports.getFileNameNoSuffix = (filePath) => {
  const fileName = p.basename(filePath);
  return fileName.match(/([^\.]+)/)[1]
}