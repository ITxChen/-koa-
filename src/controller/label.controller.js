const labelService = require("../service/label.service");
class LabelController {
  async create(ctx, next) {
    // 1.获取标签的名称
    const { name } = ctx.request.body;
    const result = await labelService.create(name);
    ctx.body = {
      code: 0,
      message: "创建标签成功",
      data: result,
    };
  }
  async list(ctx, next) {
    const { off, siz } = ctx.query;
    const [result] = await labelService.getlist(off, siz);
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}
module.exports = new LabelController();
