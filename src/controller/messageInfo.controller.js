const messageInfoService = require("../service/messageInfo.service");
class messageInfoController {
  // 增
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
  // 修改
  async modify(ctx, next) {
    try {
      const info = ctx.request.body;
      const result = await messageInfoService.modify(info);
      if (result) {
        ctx.body = {
          message: "信息修改成功",
          code: 200,
          data: info,
        };
      }
    } catch (error) {
      ctx.app.emit("error", "idRepeat", ctx);
      ctx.body = {
        message: "修改失败，请重试",
        code: 201,
      };
    }
  }
  // 获取
  async getList(ctx, next) {
    try {
      const info = ctx.request.body.uid;

      const result = await messageInfoService.getList(info);
      if (result) {
        ctx.body = {
          message: "信息查询成功",
          code: 200,
          data: result,
        };
      }
    } catch (error) {
      // ctx.app.emit("error", "idRepeat", ctx);
      ctx.body = {
        message: "信息查找失败",
        code: 201,
      };
    }
  }
}

module.exports = new messageInfoController();
