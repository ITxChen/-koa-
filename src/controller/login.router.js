const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../keys/screct");
class LoginController {
  async sign(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: { id, name, token },
    };
  }
}

module.exports = new LoginController();
