const crypto = require("crypto");
function md5Password(password) {
  // create md5算法
  const md5 = crypto.createHash("md5");
  //   将密码更新并且转化为16进制
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}
module.exports = md5Password;
