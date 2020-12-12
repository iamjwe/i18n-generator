const { extraIO } = require('../taskIO/extra');
const { getAllDirNameRecursion, createFile, getFilesPathArrByDir, createDir, deleteDir } = require('../utils/fileUtils');
const { getFileNameFromPath, getPathConcat, getSliceBasePath, getFileSuffix, getPathType } = require('../utils/pathUtils');

// codePath是一个文件
const extraCodeFile = (codeFilePath, mdDirPath, rules) => {
  const mdFilePath = createFile(getPathConcat(mdDirPath, getFileNameFromPath(codeFilePath).replace('.js', '.md')));
  extraIO(codeFilePath, mdFilePath, rules);
}

// codePath是一个文件夹
const extraCodeDir = (codeDirPath, suffixRegArr, markdownPath, rules) => {
  const dirPathArr = getAllDirNameRecursion(codeDirPath);
  dirPathArr.forEach((curDirPath) => {
    let curMdDiPath;
    // 截取相对路径获取mdDirPath
    if (curDirPath === codeDirPath) {
      curMdDiPath = markdownPath;
    } else {
      curMdDiPath = getPathConcat(markdownPath, getSliceBasePath(curDirPath, codeDirPath));
    }
    // 获取当前文件夹下的符合suffix后缀的文件
    const files = getFilesPathArrByDir(curDirPath);
    // 过滤不符合后缀名的文件
    files.filter((filePath) => {
      const fileName = getFileNameFromPath(filePath);
      const suffix = getFileSuffix(fileName);
      let regMapResult = false;
      for (let i = 0; i < suffixRegArr.length; i++) {
        if (suffixRegArr[i].test(suffix)) {
          regMapResult = true;
          break;
        }
      }
      return regMapResult
    })
    // 调用parseCodeFile提取文件夹中的每个文件
    files.forEach((filePath) => {
      extraCodeFile(filePath, curMdDiPath, rules);
    })
  })
}

// 负责业务控制
exports.extraService = (codePath, suffixRegArr, markdownPath, rules) => {
  deleteDir(markdownPath);  // 删除有内容的
  createDir(markdownPath);  // 创建一个空的
  switch (getPathType(codePath)) {
    case 'file':
      extraCodeFile(codePath, markdownPath, rules);
      break;
    case 'dir':
      extraCodeDir(codePath, suffixRegArr, markdownPath, rules);
      break;
  }
}