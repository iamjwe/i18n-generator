const { rowDataToMdRowStr, columnArrToColumnObj, columnObjToColumnArr, mdTableStrToMatrixObj, matrixObjTomdTableStr } = require('./markdown-helper');

const initMdTableStrByHeadRow = (headRow) => {
    const headRowStr = rowDataToMdRowStr(headRow);
    let secondRowStr = '|';
    headRow.forEach((_) => {
        secondRowStr += '-----|';
    })
    return `${headRowStr}\r\n${secondRowStr}\r\n`
}

const insertRow = (content, rowData) => {
    const matrix = content ? mdTableStrToMatrixObj(content) : [];
    matrix.push(rowData);
    return matrixObjTomdTableStr(matrix);
}

const insertRowByDistinctLimit = (content, rowData, distinctIndexArr) => {
    let newContent = content;
    let isDistinct = false;
    const len = distinctIndexArr.length;
    for (let i=0; i<len; i++) {
        const columnObj = selectColumn(content, i);
        const item = rowData[i];
        if (columnObj.columnData.includes(item)) {
            isDistinct = true;
            break;
        }
    }
    if (!isDistinct) {
        newContent = insertRow(content, rowData)
    }
    return newContent
}

// 插入一列
const insertColumn = (content, columnObj, columnIndex) => {
    const matrix = content ? mdTableStrToMatrixObj(content) : [];
    const columnArr = columnObjToColumnArr(columnObj);
    if (matrix.length === 0) {// 无数据，插入为第一列
        columnArr.forEach((column) => {
            matrix.push([column]);
        })
    } else {
        // 有数据，插入列到指定索引处
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

// markdown表格的读写单位为列，所以只暴露对column的读写操作
module.exports = { initMdTableStrByHeadRow, insertRow, insertRowByDistinctLimit, insertColumn, selectColumn }