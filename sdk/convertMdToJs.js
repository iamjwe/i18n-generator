const fs = require('fs');
const path = require('path');
const lodash = require('lodash/fp');
const { filterBlank, firstToLowwer } = require('../utils/utils');
const { readMdErrorHandler, parseMdErrorHandler, writeLocalesErrorHandler, readLocalesResourceErrorHandler, wirteLocalesImportFileErrorHandler } = require('../handler/errorHandler');
const { mdFileReg,  jsFileReg} = require('../const');

const transformTable = (table) => {
  const dealWithStream = lodash.flowRight([lodash.map(transformTr), lodash.filter(filterBlank), lodash.split('\r\n')]);
  return dealWithStream(table);
}

const transformTr = (tr) => {
  const fn = lodash.flowRight(lodash.map(lodash.trim), lodash.filter(filterBlank), [lodash.split('|')])
  let data = fn(tr);
  return {
    'en-US': data[0],
    'zh-CN': data[1]
  }
}

// md -> [content ...]：支持读取文件与一级文件夹
exports.readMd = (mdPath) => {
  try {
    let mdFileDataArr = [];
    const stat = fs.lstatSync(mdPath);
    const pathType = stat.isDirectory() ? 'dir' : 'file';
    switch (pathType) {
      case 'file':
        const fileName = path.basename(mdPath, '.md'); // 获取文件名
        const content = fs.readFileSync(mdPath, { encoding: 'utf-8' });
        mdFileDataArr.push({ fileName, content });
        break;
      case 'dir':
        const mdFileArr = fs.readdirSync(mdPath).filter((item) => {
          return mdFileReg.test(item)
        });
        mdFileArr.forEach((filePath) => {
          const fileName = path.basename(filePath, '.md');
          mdFileDataArr.push({ fileName, content: fs.readFileSync(mdPath + "\\" +filePath, { encoding: 'utf-8' }) });
        })
        break;
    }
   
    return mdFileDataArr;
  } catch {
    readMdErrorHandler();
  }
}

// [content ...] -> obj
exports.parseMd = (mdFileDataArr) => {
  try {
    const enZhMapFileArr = mdFileDataArr.map((mdFile) => {
      const fileName = mdFile.fileName;
      let enZhMapArr = transformTable(mdFile.content);
      enZhMapArr.shift();// 去除表头
      enZhMapArr.shift();// 去除|...|...|
      return { fileName, enZhMapArr };
    })
    return enZhMapFileArr
  } catch {
    parseMdErrorHandler();
  }
}

// obj -> code
exports.wirteLocalesResource = (enDir, zhDir, enZhMapFileArr) => {
  try {
    enZhMapFileArr.forEach((enZhMapFile) => {
      const enFilePath = enDir + "\\" + enZhMapFile.fileName + '.js';
      const zhFilePath = zhDir + "\\" + enZhMapFile.fileName + '.js';
      let enFiledata = 'export default { \n';
      let zhFiledata = 'export default { \n';
      const enZhMapArr = enZhMapFile.enZhMapArr;
      enZhMapArr.map((enZhMap) => {
        const en = enZhMap['en-US'];
        const zh = enZhMap['zh-CN'] === '' ? en : enZhMap['zh-CN'];// 没有汉化项则默认英文
        if (en.trim() != '') {
          enFiledata += `  "${en}": "${en}",\n`;
          zhFiledata += `  "${en}": "${zh}",\n`;
        }
      })
      enFiledata += '}';
      zhFiledata += '}';
      fs.writeFileSync(enFilePath, enFiledata);
      fs.writeFileSync(zhFilePath, zhFiledata);
    })
  } catch {
    writeLocalesErrorHandler();
  }
}

// jsDir -> obj
exports.readLocalesResource = (enDir, zhDir) => {
  try {
    const enFileArr = fs.readdirSync(enDir).filter((item) => {
      return jsFileReg.test(item)
    });
    const zhFileArr = fs.readdirSync(zhDir).filter((item) => {
      return jsFileReg.test(item)
    });
    let enFileNameArr = [];
    let zhFileNameArr = [];
    enFileArr.forEach((filePath) => {
      const fileName = path.basename(filePath, '.js');
      enFileNameArr.push(fileName);
    })
    zhFileArr.forEach((filePath) => {
      const fileName = path.basename(filePath, '.js');
      zhFileNameArr.push(fileName);
    })
    return { enFileNameArr, zhFileNameArr }
  } catch (e) {
    readLocalesResourceErrorHandler();
  }
}

exports.wirteLocalesImportFile = (enUSFilePath, zhCNFilePath, importDirForEnDirRelavtiveToEnUSFile, importDirForZhDirRelavtiveToZhCNFile, fileNameArrMap) => {
  try {
    const enFileNameArr = fileNameArrMap.enFileNameArr;
    const zhFileNameArr = fileNameArrMap.zhFileNameArr;
    let enUSFileImportContent = '';
    let zhCNFileImportContent = '';
    let enUSFileExportContent = 'export default {\n';
    let zhCNFileExportContent = 'export default {\n';
    enFileNameArr.map((fileName) => {
      const importName = firstToLowwer(fileName);
      enUSFileImportContent += `import ${importName} from '${importDirForEnDirRelavtiveToEnUSFile}/${fileName}';\n`;
      enUSFileExportContent += `  ...${importName},\n`;
    })
    zhFileNameArr.map((fileName) => {
      const importName = firstToLowwer(fileName);
      zhCNFileImportContent += `import ${importName} from '${importDirForZhDirRelavtiveToZhCNFile}/${fileName}';\n`;
      zhCNFileExportContent += `  ...${importName},\n`;
    })
    enUSFileExportContent += '}';
    zhCNFileExportContent += '}';
    fs.writeFileSync(enUSFilePath, enUSFileImportContent + enUSFileExportContent);
    fs.writeFileSync(zhCNFilePath, zhCNFileImportContent + zhCNFileExportContent);
  } catch (e) {
    wirteLocalesImportFileErrorHandler();
  }
}
