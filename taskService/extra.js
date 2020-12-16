const { forEach } = require('lodash');
const { extraIO } = require('../taskIO/extra');
const { getAllDirNameRecursion, getFilesPathArrByDir, createDir, deleteDir } = require('../utils/fileUtils');
const { getPathConcat, getSliceBasePath, getPathType, getFileNameNoSuffix, getDirPathFiltered, getFilePathFiltered } = require('../utils/pathUtils');

// codePath是一个文件
const extraCodeFile = (codeFile, mdDir, rules) => {
  const toMdFile = getPathConcat(mdDir, getFileNameNoSuffix(codeFile) + '.md');
  extraIO(codeFile, toMdFile, rules);
}

// codePath是一个文件夹
const extraCodeDir = (codeDir, mdDir, rules, options) => {
  let dirPathArr = getAllDirNameRecursion(codeDir);
  if (options && options.excluded) {
    dirPathArr = getDirPathFiltered(dirPathArr, options.excluded)
  }
  dirPathArr.forEach((curDirPath) => {
    let curMdDiPath;
    // 截取相对路径获取mdDirPath
    if (curDirPath === codeDir) {
      curMdDiPath = mdDir;
    } else {
      curMdDiPath = getPathConcat(mdDir, getSliceBasePath(curDirPath, codeDir));
    }
    let files = getFilesPathArrByDir(curDirPath);
    // 获取当前文件夹下的符合后缀规则的文件
    if (options) {
      files = getFilePathFiltered(files, options.excluded, options.suffixs, options.notSuffixs);
    }
    // 调用parseCodeFile提取文件夹中的每个文件
    files.forEach((filePath) => {
      extraCodeFile(filePath, curMdDiPath, rules, options);
    })
  })
}

// 配置信息中，fromCode是一个字符串
const fromCodeTypeOfString = (fromCode, toMarkdown, rules) => {
  switch (getPathType(fromCode)) {
    case 'file':
      extraCodeFile(fromCode, toMarkdown, rules);
      break;
    case 'dir':
      extraCodeDir(fromCode, toMarkdown, rules);
      break;
  }
}

// 配置信息中，fromCode是一个字符串
const fromCodeTypeOfArray = (fromCode, toMarkdown, rules) => {
  fromCode.forEach((codeInfo) => {
    switch (typeof codeInfo) {
      case 'string':
        fromCodeTypeOfString(codeInfo, toMarkdown, rules);
        break;
      case 'object':
        // 肯定是一个文件夹
        const options = {
          "excluded": codeInfo.excluded,
          "suffixs": codeInfo.suffixs,
          "notSuffixs": codeInfo.notSuffixs,
        }
        extraCodeDir(codeInfo.path, toMarkdown, rules, options);
        break;
    }
  })
}

// 负责业务控制
exports.extraService = (fromCode, toMarkdown, rules) => {
  deleteDir(toMarkdown);  // 删除有内容的
  createDir(toMarkdown);  // 创建一个空的
  if (typeof fromCode === 'string') {
    fromCodeTypeOfString(fromCode, toMarkdown, rules)
    return
  }
  if (Array.isArray(fromCode)) {
    fromCodeTypeOfArray(fromCode, toMarkdown, rules)
  }
}

