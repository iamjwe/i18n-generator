const path = require("path");
const fs = require("fs");
const lodash = require('lodash/fp');

const columnArrToColumnObj = (columnArr) => {
    const columnHead = columnArr[0];
    columnArr.shift(); // 去除表头
    columnArr.shift(); // 去除|...|...|
    return {
        columnHead,
        columnData: columnArr
    }
}

const columnObjToColumnArr = (columnObj) => {
    const columnArr = columnObj.columnData;
    columnArr.unshift("-----");
    columnArr.unshift(columnObj.columnHead);
    return columnArr
}

// mdTable字符串转换为矩阵（二维数组）
const mdTableStrToMatrixObj = (table) => {
    const filterBlank = (item) => {
        return item != ''
    };
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

// 插入一列
const insertColumn = (content, columnObj, columnIndex) => {
    const matrix = content ? mdTableStrToMatrixObj(content) : [];
    const columnArr = columnObjToColumnArr(columnObj);
    if (matrix.length === 0) {// 插入第一列
        columnArr.forEach((column) => {
            matrix.push([column]);
        })
    } else {
        // 校正columnIndex
        const columnLength = matrix[0].length;
        if (columnIndex === undefined || columnIndex > columnLength) {
            columnIndex = columnLength; // 插入到最后
        }
        matrix.forEach((row, index) => {
            // 插入排序思想：找到位置后，元素后移再插入
            for (let i = columnLength - 1; i >= columnIndex; i--) {
                row[i + 1] = row[i];
            }
            row[columnIndex] = columnArr[index];
        })
    }
    const mdTableStr = matrixObjTomdTableStr(matrix);
    return mdTableStr;
}


const readColumn = (mdFilePath, columnNum) => {
    const columnIndex = columnNum - 1;
    try {
        const columnObj = {
            columnHead: 'fa',
            columnData: [1, 2]
        }
        const newContent = insertColumn('', columnObj, 0)
        console.log(newContent)
    } catch (e) {

    }

}

readColumn(path.join(__dirname, "test.md"), 2)