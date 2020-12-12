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

// 读取一列 {head, data}
const selectColumn = (content, columnIndex) => {
    const matrix = mdTableStrToMatrixObj(content);
    const columnArr = [];
    matrix.forEach(row => {
        columnArr.push(row[columnIndex]);
    });
    const columnObj = columnArrToColumnObj(columnArr);
    return columnObj;
}

// 插入一列
const insertColumn = (content, columnObj, columnIndex) => {
    const matrix = mdTableStrToMatrixObj(content);
    // 校正columnIndex
    const columnLength = matrix[0].length;
    if (columnIndex === undefined || columnIndex > columnLength) {
        columnIndex = columnLength;// 插入到最后
    }
    const columnArr = columnObjToColumnArr(columnObj);
    // 插入列
    matrix.forEach((row, index) => {
        // 插入排序思想：找到位置后，元素后移再插入
        for (let i = columnLength - 1; i >= columnIndex; i--) {
            row[i+1] = row[i];
        }
        row[columnIndex] = columnArr[index];
    }) 
    const mdTableStr = matrixObjTomdTableStr(matrix);
    return mdTableStr;
}

// markdown表格的读写单位为列，所以只暴露对column的读写操作
module.exports = { selectColumn, insertColumn}