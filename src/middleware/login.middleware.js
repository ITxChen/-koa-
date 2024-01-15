const jwt = require("jsonwebtoken");
const md5Password = require("../service/md5-password");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../keys/screct");
const UserService = require("../service/user.service");
// 验证账号密码
const verifyLogin = async (ctx, next) => {
  const { name, passwd } = ctx.request.body;
  // 判断账号密码
  if (!name || !passwd) {
    return ctx.app.emit("error", "name_or_password_is_required", ctx);
  }
  // 查询是否在数据库中
  const users = await UserService.findUserByName(name);
  const user = users[0];
  console.log("user", user);
  if (!user) {
    return ctx.app.emit("error", "name_is_not_exists", ctx);
  }
  //  判断密码是否正确
  if (user.passwd !== md5Password(passwd)) {
    console.log(user.passwd);
    console.log(md5Password(passwd));
    return ctx.app.emit("error", "passwrod_is_incorrect", ctx);
  } else {
    // 将user保存到ctx中，ctx共享
    ctx.user = user;
    console.log("登录成功");
    await next();
  }
};
// 验证token
const verifyAuth = async (ctx, next) => {
  console.log("开始鉴权");
  const authorization = ctx.header.authorization;
  // if (!authorization) {
  //   return ctx.app.emit("error", "unauthorization", ctx);
  // }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    console.log("验证token通过,用户id:", ctx.user.name);
    await next();
  } catch (error) {
    ctx.app.emit("error", "unauthorization", ctx);
  }
};
module.exports = { verifyLogin, verifyAuth };
