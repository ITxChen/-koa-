const jwt = require("jsonwebtoken");
const connection = require("../app/database");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../keys/screct");
class LoginController {
  async sign(ctx, next) {
    console.log("---------");
    const { name, passwd, type, uid } = ctx.user;
    const token = jwt.sign({ name, passwd }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60, //24小时
      algorithm: "RS256", //加密方法
    });
    // 根据type和uid获取学生的全部信息
    if (type == "1") {
      console.log("jinlaile");
      const statement = "SELECT * FROM students WHERE type = ? AND id = ?";
      const [result] = await connection.execute(statement, [type, uid]);
      console.log("res", result);
      ctx.body = {
        code: 200,
        data: { result: result[0], info: { name, passwd, token, type, uid } },
      };
    }
    console.log("chulaile");
  }
}

module.exports = new LoginController();
