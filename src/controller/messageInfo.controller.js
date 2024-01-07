const messageInfoService = require("../service/messageInfo.service");
class messageInfoController {
  async create(ctx, next) {
    try {
      const info = ctx.request.body;
      const result = await messageInfoService.create(info);
      if (result) {
        ctx.body = {
          message: "信息导入成功",
          code: 200,
          data: info,
        };
      }
    } catch (error) {
      ctx.app.emit("error", "idRepeat", ctx);
      ctx.body = {
        message: "用户学号重复",
        code: 201,
      };
    }
  }
}

module.exports = new messageInfoController();
