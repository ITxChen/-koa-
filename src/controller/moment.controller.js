const { context } = require("../app");
const MomentService = require("../service/moment.service");

class MomentController {
  async creat(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body;
    // 2.动态是谁发布的
    const { id } = ctx.user;

    // 3.保存到数据库
    const result = await MomentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "发表动态成功",
      data: result,
    };
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await MomentService.getList(offset, size);
    ctx.body = {
      code: 0,
      message: "获取成功",
      data: result,
    };
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await MomentService.detail(momentId);
    ctx.body = {
      code: 0,
      message: "获取单条数据成功",
      data: result,
    };
  }
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await MomentService.update(momentId, content);
    ctx.body = {
      code: 0,
      message: "修改成功",
      data: result,
    };
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await MomentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: result,
    };
  }
}
module.exports = new MomentController();
