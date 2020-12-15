const { extraIO } = require('../taskIO/extra');
const { getAllDirNameRecursion, getFilesPathArrByDir, createDir, deleteDir, readFileUtf8 } = require('../utils/fileUtils');
const { getFileNameFromPath, getPathConcat, getSliceBasePath, getFileSuffix, getPathType, getFileNameNoSuffix } = require('../utils/pathUtils');

const dirPathFilter = (dirPathArr, excluded) => {
  let filterResult = dirPathArr.filter((dirPath) => {
    if (excluded.includes(dirPath)) {
      return false
    }
    return true
  })
  return filterResult
}

const filePathFilter = (filePathArr, excluded, suffixRegArr, extraSuffixRegArr) => {
  let filterResult = filePathArr.filter((filePath) => {
    const fileName = getFileNameFromPath(filePath);
    if (excluded && excluded.includes(fileName)) {
      return false
    }
    const suffix = getFileSuffix(fileName);
    let regMapResult = false;
    for (let i = 0; i < suffixRegArr.length; i++) {
      if (suffixRegArr[i].test(suffix)) {
        regMapResult = true;
        break;
      }
    }
    for (let i = 0; i < extraSuffixRegArr.length; i++) {
      if (extraSuffixRegArr[i].test(suffix)) {
        regMapResult = false;
        break;
      }
    }
    return regMapResult
  })
  return filterResult
}
// codePath是一个文件
const extraCodeFile = (codeFilePath, mdDirPath, rules) => {
  const mdFilePath = getPathConcat(mdDirPath, getFileNameNoSuffix(codeFilePath) + '.md');
  extraIO(codeFilePath, mdFilePath, rules);
}


// codePath是一个文件夹
const extraCodeDir = (codeDirPath, suffixRegArr, extraSuffixRegArr, markdownPath, rules, options) => {
  let dirPathArr = getAllDirNameRecursion(codeDirPath);
  if (options && options.excluded) {
    dirPathArr = dirPathFilter(dirPathArr, options.excluded)
  }
  dirPathArr.forEach((curDirPath) => {
    let curMdDiPath;
    // 截取相对路径获取mdDirPath
    if (curDirPath === codeDirPath) {
      curMdDiPath = markdownPath;
    } else {
      curMdDiPath = getPathConcat(markdownPath, getSliceBasePath(curDirPath, codeDirPath));
    }
    // 获取当前文件夹下的符合suffix后缀的文件
    let files = getFilesPathArrByDir(curDirPath);
    // 过滤不符合后缀名的文件
    files = filePathFilter(files, options ? options.excluded : undefined, suffixRegArr, extraSuffixRegArr);
    // 调用parseCodeFile提取文件夹中的每个文件
    files.forEach((filePath) => {
      extraCodeFile(filePath, curMdDiPath, rules, options);
    })
  })
}

// 负责业务控制
exports.extraService = (codePath, suffixRegArr, extraSuffixRegArr, markdownPath, rules) => {
  deleteDir(markdownPath);  // 删除有内容的
  createDir(markdownPath);  // 创建一个空的
  if (typeof codePath === "string") {
    // codepath.path = "file / dir"
    switch (getPathType(codePath)) {
      case 'file':
        extraCodeFile(codePath, markdownPath, rules);
        break;
      case 'dir':
        extraCodeDir(codePath, suffixRegArr, extraSuffixRegArr, markdownPath, rules);
        break;
    }
  } else {
    // codepath.path = "[file / dir]"
    codePath.forEach((path) => {
      if (typeof path === 'string') {
        switch (getPathType(path)) {
          case 'file':
            extraCodeFile(path, markdownPath, rules);
            break;
          case 'dir':
            extraCodeDir(path, suffixRegArr, extraSuffixRegArr, markdownPath, rules);
            break;
        }
      }
      else {
        // codepath.path = "[{base: "src", excluded: "modals"}]"
        extraCodeDir(path.base, suffixRegArr, extraSuffixRegArr, markdownPath, rules, { excluded: path.excluded });
      }
    })
  }

}