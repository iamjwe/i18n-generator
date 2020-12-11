const { getAllDirNameRecursion, readFileUtf8, writeFile, createFile, getFilesPathArrByDir } = require('../utils/fileUtils');
const { extraLangKey, convertStrArrToMdTableStr } = require('../taskSDK/extra');
const { getFileNameFromPath, getPathConcat, getSliceBasePath, getFileSuffix }  = require('../utils/pathUtils');

// codePath是一个文件
const parseCodeFile = (codeFilePath, mdDirPath, languageVariableReg, languageKeyReg, regKeyIndex, columnName) => {
  // 读取：从markdown文件中读取字符串内容
  const content = readFileUtf8(codeFilePath);
  // 匹配：从字符串中正则查找得到语言变量字符串数组
  const keyArr = extraLangKey(content, languageVariableReg, languageKeyReg, regKeyIndex);
  // 转换：从语言变量字符串数组得到md表格字符串
  const mdTableStr = convertStrArrToMdTableStr(keyArr, columnName);
  // 写入：将md表格字符串写入到md文件中
  const mdFilePath = getPathConcat(mdDirPath, getFileNameFromPath(codeFilePath).replace('.js', '.md'));
  writeFile(createFile(mdFilePath), mdTableStr);
}

// codePath是一个文件夹
const parseCodeDir = (codeDirPath, mdDirPath, suffixRegArr, languageVariableReg, languageKeyReg, regKeyIndex, columnName) => {
  const dirPathArr = getAllDirNameRecursion(codeDirPath);
  dirPathArr.forEach((curDirPath) => {
    let curMdDiPath;
    // 截取相对路径获取mdDirPath
    if (curDirPath === codeDirPath) {
      curMdDiPath = mdDirPath;
    } else {
      curMdDiPath = getPathConcat(mdDirPath, getSliceBasePath(curDirPath, codeDirPath));
    }
    // 获取当前文件夹下的符合suffix后缀的文件
    const files = getFilesPathArrByDir(curDirPath);
    // 过滤不符合后缀名的文件
    files.filter((filePath) => {
      const fileName = getFileNameFromPath(filePath);
      const suffix = getFileSuffix(fileName);
      let regMapResult = false;
      for (let i=0;i<suffixRegArr.length;i++) {
        if (suffixRegArr[i].test(suffix)) {
          regMapResult = true;
          break;
        }
      }
      return regMapResult
    })
    // 调用parseCodeFile提取文件夹中的每个文件
    files.forEach((filePath) => {
      parseCodeFile(filePath, curMdDiPath, languageVariableReg, languageKeyReg, regKeyIndex, columnName);
    })
  })
}

module.exports = { parseCodeFile, parseCodeDir }
