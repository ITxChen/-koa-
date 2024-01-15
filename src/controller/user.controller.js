const UserService = require("../service/user.service");
class UserController {
  async create(ctx, next) {
    // 1.获取用户传递的信息
    console.log("daozhe");
    const user = ctx.request.body;
    // 2.将信息存储到数据库
    const result = await UserService.create(user);
    //  返回值
    ctx.body = {
      message: "创建用户成功",
      code: 200,
      data: result,
    };
  }
  // 修改密码
  async modifyPasswd(ctx, next) {
    // 获取表单信息
    const userinfo = ctx.request.body;
    console.log("userinfo", userinfo);
    // 先去student表验证信息是否正确
    const result = await UserService.modifyPasswd(userinfo);
    console.log("result", result);
    if (result) {
      ctx.body = {
        code: 200,
        message: "密码修改成功",
      };
    }
  }
}

module.exports = new UserController();
