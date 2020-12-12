const {
  generatorResourceFileIO,
  generatorResImpAndExpFileIO,
} = require('../taskIO/generator');
const {
  getAllDirNameRecursion,
  createFile,
  getFilesPathArrByDir,
  createDir,
  deleteDir
} = require('../utils/fileUtils');
const {
  getFileNameFromPath,
  getPathConcat,
  getSliceBasePath,
  getFileSuffix,
  getPathType,
  getFileNameNoSuffix
} = require('../utils/pathUtils');

const convertMdFile = (mdFilePath, resPath, rules) => {
  rules.forEach((rule) => {
    const resName = rule.toResource.name;
    const resImpAndExpFilePath = createFile(getPathConcat(resPath, resName) + '.js');
    const resFilePath = createFile(getPathConcat(getPathConcat(resPath, resName), getFileNameFromPath(mdFilePath).replace('.md', '.js')));
    generatorResourceFileIO(mdFilePath, rule.fromColumn.keyColumnNum - 1, rule.fromColumn.valColumnNum - 1, resFilePath);
    generatorResImpAndExpFileIO(resImpAndExpFilePath, getFileNameNoSuffix(mdFilePath), `./${resName}`);
  })
}

const convertMdDir = (mdDirPath, resPath, rules) => {
  rules.forEach((rule) => {
    const resName = rule.toResource.name;
    const withNameResPath = getPathConcat(resPath, resName); // example: 创建en-US文件夹
    const resImpAndExpFilePath = createFile(getPathConcat(resPath, resName) + '.js'); // example: 创建en-US.js文件
    // 获取所有的文件夹
    const mdDirPathArr = getAllDirNameRecursion(mdDirPath);
    mdDirPathArr.forEach((curMdDirPath) => {
      let relativePath;
      let curResPath;
      // 构造relativePath和curResPath
      if (curMdDirPath === mdDirPath) {
        relativePath = '';
        curResPath = withNameResPath;
      } else {
        curResPath = getPathConcat(withNameResPath, getSliceBasePath(curMdDirPath, mdDirPath));
        relativePath = '/' + getSliceBasePath(curMdDirPath, mdDirPath);
        console.log('/' + relativePath)
      }
      // 处理当前md文件夹下的所有文件
      const files = getFilesPathArrByDir(curMdDirPath, /.md/);
      files.forEach((filePath) => {
        const resFilePath = createFile(getPathConcat(curResPath, getFileNameFromPath(filePath).replace('.md', '.js')));
        generatorResourceFileIO(filePath, rule.fromColumn.keyColumnNum - 1, rule.fromColumn.valColumnNum - 1, resFilePath);
        generatorResImpAndExpFileIO(resImpAndExpFilePath, getFileNameNoSuffix(filePath), `./${resName}${relativePath}`);
      })
    })
  })
}

exports.generatorService = (mdPath, resPath, rules) => {
  deleteDir(resPath);
  createDir(resPath);
  switch (getPathType(mdPath)) {
    case 'file':
      convertMdFile(mdPath, resPath, rules);
      break;
    case 'dir':
      convertMdDir(mdPath, resPath, rules);
      break;
  }
}