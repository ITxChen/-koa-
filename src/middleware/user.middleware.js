const UserService = require("../service/user.service");
const md5Password = require("../service/md5-password");
// 验证用户信息
const verifyUser = async (ctx, next) => {
  console.log("验证用户");
  // 2.验证用户信息
  const { name, passwd, type } = ctx.request.body;
  console.log("ctx", ctx.request.body);
  // 2.验证信息
  if (!name || !passwd) {
    return ctx.app.emit("error", "name_or_password_is_required", ctx);
  }
  const user = await UserService.findUserByName(name);
  if (user.length) {
    return ctx.app.emit("error", "name_is_already_exists", ctx);
  }
  await next();
};
// 加密密码
const handlePassword = async (ctx, next) => {
  console.log("密码加密");
  const { passwd } = ctx.request.body;
  ctx.request.body.passwd = md5Password(passwd);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
