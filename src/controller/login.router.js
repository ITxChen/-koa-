const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../keys/screct");
class LoginController {
  async sign(ctx, next) {
    const { name, passwd, type } = ctx.user;
    const token = jwt.sign({ name, passwd }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60, //24小时
      algorithm: "RS256", //加密方法
    });
    ctx.body = {
      code: 200,
      data: { name, passwd, type, token },
    };
  }
}

module.exports = new LoginController();
