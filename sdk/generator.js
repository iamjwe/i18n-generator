// 仿一个Python的zip函数
const zip = (arr1, arr2) => {
    let zipArr = [];
    const len = arr1.length;
    for (let i = 0; i < len; i++) {
        zipArr.push([arr1[i], arr2[i]]);
    }
    return zipArr
}

// 生成资源文件内容
const convert2ColumnToResourceJsStr = (keyColumn, valColumn) => {
    // 得到2 * n 矩阵
    const matrix = zip(keyColumn, valColumn);
    let resourceJsStr = 'export default { \n';
    matrix.forEach((row) => {
        const key = row[0];
        const val = row[1];
        if (key.trim() != '') {
            resourceJsStr += `  "${key}": "${val}",\n`;
        }
    })
    resourceJsStr += '}';
    return resourceJsStr
}

// 首字母转小写
const firstToLowwer = (str) => {
    return str.slice(0, 1).toLowerCase() + str.slice(1)
};

// 生成指定位数的随机字符串
const randomString = (number) => {
    let str = "";
    const charArr = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678";
    const len = charArr.length;
    for (i = 0; i < number; i++) {
        str += charArr.charAt(Math.floor(Math.random() * len));
    }
    return str
}

// 插入到资源引入文件中
const insertToResImpAndExp = (oldContent, resFileName, relativeResFilePath) => {
    const insertVarName = randomString(3) + '_' + firstToLowwer(resFileName);
    let oldImport = '';
    let oldExport = ''; //只取...的部分
    if (oldContent) {
        const result = oldContent.split('export default {\n');
        oldImport = result[0];
        oldExport = result[1].split('}')[0];
    }
    let newImport = `import ${insertVarName} from '${relativeResFilePath.replace('\\','/')}/${resFileName}';\n`;
    let newExport = `  ...${insertVarName},\n`;
    return newImport + oldImport + 'export default {\n' + newExport + oldExport + '}';
}

module.exports = {
    convert2ColumnToResourceJsStr,
    insertToResImpAndExp
}