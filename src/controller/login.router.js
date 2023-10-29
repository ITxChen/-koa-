const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../keys/screct");
class LoginController {
  async sign(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    console.log(token);
    ctx.body = {
      code: 0,
      data: { id, name, token },
    };
  }

  test(ctx, next) {
    ctx.body = "验证身份通过";
  }
}

module.exports = new LoginController();
