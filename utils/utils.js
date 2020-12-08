const filterBlank = (item) => {return item != ''};

const firstToLowwer = (str) => {return str.slice(0,1).toLowerCase() +str.slice(1)};

exports.filterBlank = filterBlank;
exports.firstToLowwer = firstToLowwer;