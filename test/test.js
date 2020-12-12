const path = require("path");
const fs = require("fs");
const lodash = require('lodash/fp');

const columnArrToColumnObj = (columnArr) => {
    const columnHead = columnArr[0];
    columnArr.shift();// 去除表头
    columnArr.shift();// 去除|...|...|
    return {columnHead, columnData: columnArr}
}

const columnObjToColumnArr = (columnObj) => {
    const columnArr = columnObj.columnData;
    columnArr.unshift("-----");
    columnArr.unshift(columnObj.columnHead);
    return columnArr
}

// mdTable字符串转换为矩阵（二维数组）
const mdTableStrToMatrixObj = (table) => {
    const filterBlank = (item) => {return item != ''};
    const convertTrToArr = (tr) => {
        const convertTrStream = lodash.flowRight(lodash.map(lodash.trim), lodash.filter(filterBlank), [lodash.split('|')])
        return convertTrStream(tr);
    }
    const convertTableStream = lodash.flowRight([lodash.map(convertTrToArr), lodash.filter(filterBlank), lodash.split('\r\n')]);
    return convertTableStream(table);
}

const matrixObjTomdTableStr = (matrix) => {
    let mdTableStr = '';
    const convertArrToTr = (arr) => {
        let trStr = '|' + arr.join('|') + '|';
        return trStr
    }
    matrix.forEach((arr) => {
        const trStr = convertArrToTr(arr);
        mdTableStr += trStr + '\r\n';
    })
    return mdTableStr;
}

// 读取一行
const selectRow = () => {

}

// 生成一行
const insertRow = () => {

}


const readColumn = (mdFilePath, columnNum) => {
    const columnIndex = columnNum - 1;
    try {
        const content = fs.readFileSync(mdFilePath, {
            encoding: "utf-8"
        });
        const columnObj = {columnHead: 'fa', columnData: [1,2]}
        const newContent = insertColumn(content, columnObj, 0)
        console.log(newContent)
    } catch (e) {

    }

}

readColumn(path.join(__dirname, "test.md"), 2)