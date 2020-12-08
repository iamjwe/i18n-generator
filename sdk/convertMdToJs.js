const fs = require('fs');
const lodash = require('lodash/fp');
const { filterBlank } = require('./util');

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

const convertMdToJs = (mdDir, enDir, zhDir, mdFileName, jsFileName) =>{
  const mdFilePath = mdDir + mdFileName;
  const enFilePath = enDir + jsFileName;
  const zhFilePath = zhDir + jsFileName;
  // 1.读取数据
  let data = fs.readFileSync(mdFilePath, { encoding: 'utf-8' });
  // 2.转换数据
  let kvArr = transformTable(data);
  kvArr.shift();// 去除表头
  kvArr.shift();// 去除|...|...|
  let enFiledata = 'export default { \n';
  let zhFiledata = 'export default { \n';
  kvArr.map((item) => {
    const en = item['en-US'];
    const zh = item['zh-CN'] === '' ? en : item['zh-CN'];
    if(en.trim()!=''){
      enFiledata += `  "${en}": "${en}",\n`;
      zhFiledata += `  "${en}": "${zh}",\n`;
    }
  })
  enFiledata += '}';
  zhFiledata += '}';
  // 3.写入数据
  fs.writeFileSync(enFilePath,enFiledata);
  fs.writeFileSync(zhFilePath,zhFiledata);
}

exports.convertMdToJs = convertMdToJs;