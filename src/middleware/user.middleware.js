const UserService = require("../service/user.service");
const md5Password = require("../service/md5-password");
// 验证用户信息
const verifyUser = async (ctx, next) => {
  console.log("验证用户");
  // 2.验证用户信息
  const { name, password } = ctx.request.body;
  // 2.验证信息
  if (!name || !password) {
    return ctx.app.emit("error", "name_or_password_is_required", ctx);
  }
  const users = await UserService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", "name_is_already_exists", ctx);
  }
  await next();
};
// 加密密码
const handlePassword = async (ctx, next) => {
  console.log("密码加密");
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};
module.exports = {
  verifyUser,
  handlePassword,
};