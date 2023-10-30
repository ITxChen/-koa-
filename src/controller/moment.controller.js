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
  //  为表多对多进行添加处理
  async addLabels(ctx, next) {
    // 获取参数
    const { labels } = ctx;
    const { momentId } = ctx.params;
    // 将moment_id 和label_id添加到moment_label关系表
    try {
      for (const label of labels) {
        // 判断label_id和moment_id已经存在数据
        const isExists = await MomentService.hasLabel(momentId, label.id);
        // console.log(!isExists);
        if (isExists) {
          // 不存在，就存入关系表
          const result = await MomentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        code: 0,
        message: "数据关联成功",
      };
    } catch (error) {
      console.log("有错误:error", error);
    }
  }
}
module.exports = new MomentController();
