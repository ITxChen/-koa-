class scheduleController {
  async getList(ctx, next) {
    try {
      const term = ctx.request.body;
      const res = await scheduleService.getList(term);
      if (res) {
        ctx.body = {
          message: "获取课表成功",
          code: 200,
          data: res,
        };
      } else {
        ctx.body = {
          message: "获取列表失败/列表还未更新",
          code: -101,
        };
      }
    } catch (error) {}
  }
}
