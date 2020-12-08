const { convertMdToJs } = require('./convertMdToJs');
const lodash = require('lodash');
const fs = require('fs');
const { firstToLowwer } = require('./util');

// 转换指定一个md文件
function convertOne(mdDir, enDir, zhDir, mdName, jsName) {
  try {
    convertMdToJs(mdDir, enDir, zhDir, mdName, jsName);
  } catch (e) {
    console.log(`${mdName} 转换失败，请检查`)
  }
}

// 转换一个文件夹的下的所有md文件（一级目录）
function convertAll(mdDir, localesDir) {
  // 柯里化
  const enDir = `${localesDir}en-US\\experiment-tracking\\`;
  const enFile = `${localesDir}en-US.js`;
  const zhDir =  `${localesDir}zh-CN\\experiment-tracking\\`;
  const zhFile =  `${localesDir}zh-CN.js`;
  const curriedConvertMdToJs = lodash.curry(convertMdToJs, 5);
  const mdToJs = curriedConvertMdToJs(mdDir, enDir, zhDir);// 注意相对路径容易报错
  const reg = /.md/;
  const fileArr = fs.readdirSync(mdDir);
  const mdFileArr = fileArr.filter((item) => {
    return reg.test(item)
  });
  const fileNameArr = [];// 用于自动引入zh-CN.js和en-US.js文件
  mdFileArr.map((mdFileName) => {
    const fileName = mdFileName.split('.md')[0];
    fileNameArr.push(fileName);
    const jsFileName = fileName + '.js';
    mdToJs(mdFileName, jsFileName);
  })

  // 生成en-US.js文件和zh-CN.js文件
  let enUSFileImportContent = '';
  let zhCNFileImportContent = '';
  let exportContent = 'export default {\n';
  fileNameArr.map((fileName) => {
    const importName = firstToLowwer(fileName);
    enUSFileImportContent += `import ${importName} from './en-US/experiment-tracking/${fileName}';\n`;
    zhCNFileImportContent += `import ${importName} from './zh-CN/experiment-tracking/${fileName}';\n`;
    exportContent += `  ...${importName},\n`;
  })
  exportContent += '}'
  fs.writeFileSync(enFile,enUSFileImportContent + exportContent);
  fs.writeFileSync(zhFile,zhCNFileImportContent + exportContent);
}

module.exports = { convertOne, convertAll}