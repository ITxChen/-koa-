const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const scheduleController = require("../controller/schedule.controller");
const scheduleRouter = new KoaRouter({ prefix: "/schedule" });
scheduleRouter.post("/list", verifyAuth, scheduleController.getList);
module.exports = scheduleRouter;
// 课程表接口
