exports.filterBlank = (item) => {return item != ''};

exports.firstToLowwer = (str) => {return str.slice(0,1).toLowerCase() +str.slice(1)};

exports.parsePath = (pathInput) => {
  const workDir = process.cwd();
  if (pathInput === '.') {
    return workDir
  } else {
    return workDir + '\\' + pathInput;
  }
}
