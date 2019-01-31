function emptyStr(str) {
  if (str == null || str == '' || typeof str == 'undefined') {
    return true;
  }
  return false;
}

module.exports = {
  emptyStr: emptyStr
}