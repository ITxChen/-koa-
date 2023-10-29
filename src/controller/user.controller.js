const UserService = require("../service/user.service");
class UserController {
  async create(ctx, next) {
    // 1.获取用户传递的信息
    const user = ctx.request.body;
    // 2.将信息存储到数据库
    const result = await UserService.create(user);
    console.log("储存用户");
    //  返回值
    ctx.body = {
      message: "创建用户成功",
      data: result,
    };
  }
}

module.exports = new UserController();